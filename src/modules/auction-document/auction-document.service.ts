import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AuctionDocumentStatus,
  AuctionType,
} from '../../common/constants/enums';
import { CreateAuctionDocumentDto } from './dto/create-auction-document.dto';
import { UpdateAuctionDocumentDto } from './dto/update-auction-document.dto';
import { validateAuctionType } from '../auction-document/validators/is-valid-restricted-asset.validator';
import { User } from '../user/entities/user.entity';
import { AuctionDocument } from './entities/auction-document.entity';
import { ImagesService } from '../image/image.service';
import { Image } from '../image/entities/image.entity';
import { ImageRelation } from '../image-relation/entities/image-relation.entity';
import { UserRole } from '../../common/constants/enums';
import { PaginatedResponse } from '../../interfaces/paginated-response.interface';
import { MailService } from '../../mail/mail.service';
import { AuctionSessionService } from '../auction-session/auction-session.service';
import { AuctionSession } from '../auction-session/entities/auction-session.entity';
import { validateAuctionTime } from '../auction-session/validators/auction-time.validator';

@Injectable()
export class AuctionDocumentService {
  constructor(
    private readonly auctionSessionService: AuctionSessionService,

    @InjectRepository(AuctionDocument)
    private readonly auctionRepository: Repository<AuctionDocument>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly mailService: MailService,
    @InjectRepository(AuctionDocument)
    private readonly assetRepository: Repository<AuctionDocument>,

    @InjectRepository(AuctionSession)
    private readonly auctionSessionRepository: Repository<AuctionSession>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,

    @InjectRepository(ImageRelation)
    private readonly imageRelationRepository: Repository<ImageRelation>,

    private readonly imagesService: ImagesService,
  ) {}

  async reviewAsset(id: number, action: 'approve' | 'reject', reason?: string) {
    const asset = await this.auctionRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!asset) {
      throw new NotFoundException('Tài sản không tồn tại');
    }

    if (action === 'approve') {
      // 1. Kiểm tra thời gian tài sản
      if (!asset.startTime || !asset.endTime) {
        throw new BadRequestException(
          'Thời gian bắt đầu và kết thúc không được để trống',
        );
      }

      // 2. Kiểm tra nếu tài sản đã có phiên đấu giá
      if (asset.sessionId) {
        throw new BadRequestException(
          'Tài sản này đã được gắn với một phiên đấu giá.',
        );
      }

      // 3. Validate thời gian đấu giá
      validateAuctionTime(asset.startTime, asset.endTime);

      // 4. Cập nhật trạng thái tài sản
      asset.status = AuctionDocumentStatus.APPROVED;
      await this.auctionRepository.save(asset);

      // 5. Tạo phiên đấu giá từ tài sản đã duyệt
      const session =
        await this.auctionSessionService.createSessionFromApprovedAsset(asset);

      // 6. Cập nhật lại sessionId của tài sản
      asset.sessionId = session.id as number;
      await this.auctionRepository.save(asset);

      // 7. Gửi email xác nhận
      await this.mailService.sendUserVerificationSuccess(asset.user.email);

      // 8. Trả danh sách phiên sắp diễn ra
      return this.auctionSessionRepository.find({
        where: { status: AuctionDocumentStatus.UPCOMING as any },
        relations: ['createdBy'],
        order: { startTime: 'ASC' },
      });
    }

    if (action === 'reject') {
      asset.status = AuctionDocumentStatus.CANCELLED;
      asset.rejectedReason = reason || 'Không rõ lý do';
      await this.auctionRepository.save(asset);

      await this.mailService.sendUserRejectionNotice(
        asset.user.email,
        asset.rejectedReason,
      );

      return { message: 'Tài sản đã bị từ chối.' };
    }

    throw new BadRequestException('Hành động không hợp lệ.');
  }

  async getAssetsByStatus(status: string) {
    return this.auctionRepository.find({
      where: { status: status as AuctionDocumentStatus },
    });
  }

  async create(
    dto: CreateAuctionDocumentDto,
    user: { id: number; role: string },
  ) {
    validateAuctionType(dto, user.role);

    const newDoc = this.auctionRepository.create({
      documentCode: dto.document_code,
      depositAmount: dto.deposit_amount,
      isDepositRequired: dto.is_deposit_required ?? true,
      status: AuctionDocumentStatus.PENDING_CREATE,
      auctionType:
        (user.role as UserRole) === UserRole.ORGANIZER
          ? (dto.auction_type ?? AuctionType.PUBLIC)
          : AuctionType.PUBLIC,
      startingPrice: dto.starting_price,
      stepPrice: dto.step_price,
      registeredAt: dto.registered_at ? new Date(dto.registered_at) : undefined,
      startTime: dto.start_time ? new Date(dto.start_time) : undefined,
      endTime: dto.end_time ? new Date(dto.end_time) : undefined,
      userId: user.id,
      categoryId: dto.category_id,
      description: dto.description,
    });

    return this.auctionRepository.save(newDoc);
  }

  async update(
    id: number,
    dto: UpdateAuctionDocumentDto,
    user: { id: number; role: string },
  ) {
    const existing = await this.auctionRepository.findOneBy({ id });

    if (!existing) throw new NotFoundException('Tài sản không tồn tại');

    validateAuctionType(dto, user.role);

    const updated = this.auctionRepository.merge(existing, {
      documentCode: dto.document_code ?? existing.documentCode,
      depositAmount: dto.deposit_amount ?? existing.depositAmount,
      isDepositRequired: dto.is_deposit_required ?? existing.isDepositRequired,
      status: (dto.status as AuctionDocumentStatus) ?? existing.status,
      auctionType: (dto.auction_type as AuctionType) ?? existing.auctionType,
      startingPrice: dto.starting_price ?? existing.startingPrice,
      stepPrice: dto.step_price ?? existing.stepPrice,
      registeredAt: dto.registered_at
        ? new Date(dto.registered_at)
        : existing.registeredAt,
      categoryId: dto.category_id ?? existing.categoryId,
      description: dto.description ?? existing.description,
    });

    return this.auctionRepository.save(updated);
  }

  async remove(id: number, user: { id: number; role: string }) {
    const doc = await this.auctionRepository.findOneBy({ id });

    if (!doc) {
      throw new NotFoundException('Tài sản không tồn tại');
    }

    if ((user.role as UserRole) !== UserRole.ADMIN && doc.userId !== user.id) {
      throw new ForbiddenException('Bạn không có quyền xóa tài sản này');
    }

    await this.auctionRepository.remove(doc);

    return { message: 'Xóa tài sản thành công' };
  }

  async uploadAssetImages(
    assetId: number,
    files: Express.Multer.File[],
    user: { id: number; role: string },
  ) {
    const asset = await this.auctionRepository.findOneBy({ id: assetId });
    if (!asset) throw new NotFoundException('Tài sản không tồn tại');

    if (
      (user.role as UserRole) !== UserRole.ADMIN &&
      asset.userId !== user.id
    ) {
      throw new ForbiddenException(
        'Bạn không có quyền upload ảnh cho tài sản này',
      );
    }

    const responses = [];

    for (const file of files) {
      try {
        const folder = `asset/${asset.userId}`;
        const uploaded = await this.imagesService.uploadToCloudinary(
          file,
          folder,
        );

        const image = this.imageRepository.create({
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
          type: file.mimetype,
          size: file.size,
        });
        const savedImage = await this.imageRepository.save(image);

        const relation = this.imageRelationRepository.create({
          imageId: savedImage.id,
          imageFkId: assetId,
        });
        await this.imageRelationRepository.save(relation);

        responses.push({
          id: savedImage.id,
          url: savedImage.url,
          publicId: savedImage.publicId,
        });
      } catch (error) {
        console.error('Lỗi upload ảnh:', error);
        throw new InternalServerErrorException('Lỗi khi upload ảnh');
      }
    }

    if (asset.status === AuctionDocumentStatus.PENDING_CREATE) {
      asset.status = AuctionDocumentStatus.PENDING_APPROVAL;
      await this.auctionRepository.save(asset);
    }

    return {
      message: 'Upload thành công',
      total: responses.length,
      images: responses,
    };
  }

  async deleteAssetImage(imageId: number, user: { id: number; role: string }) {
    const image = await this.imageRepository.findOne({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException('Ảnh không tồn tại');
    }

    const relation = await this.imageRelationRepository.findOne({
      where: { imageId: image.id },
    });

    if (!relation) {
      throw new NotFoundException('Không tìm thấy mối quan hệ ảnh');
    }

    const asset = await this.auctionRepository.findOneBy({
      id: relation.imageFkId,
    });

    if (!asset) {
      throw new NotFoundException('Tài sản liên kết không tồn tại');
    }

    if (
      (user.role as UserRole) !== UserRole.ADMIN &&
      user.id !== asset.userId
    ) {
      throw new ForbiddenException('Bạn không có quyền xóa ảnh này');
    }

    await this.imagesService.deleteFromCloudinary(image.publicId!);
    await this.imageRelationRepository.remove(relation);
    await this.imageRepository.remove(image);

    return { message: 'Xóa ảnh thành công' };
  }

  async findAssets(params: {
    status?: AuctionDocumentStatus;
    auction_type?: AuctionType;
    keyword?: string;
  }): Promise<PaginatedResponse<AuctionDocument>> {
    const qb = this.assetRepository.createQueryBuilder('asset');

    qb.leftJoin('asset.category', 'category');
    // Filter theo trạng thái đấu giá (status)

    qb.andWhere('asset.status IN (:...allowedStatus)', {
      allowedStatus: [
        AuctionDocumentStatus.UPCOMING,
        AuctionDocumentStatus.ACTIVE,
        AuctionDocumentStatus.COMPLETED,
      ],
    });

    if (params.status) {
      qb.andWhere('asset.status = :status', { status: params.status });
    }
    // Filter theo loại đấu giá (auction_type)
    if (params.auction_type) {
      qb.andWhere('asset.auctionType = :auctionType', {
        auctionType: params.auction_type,
      });
    }
    // Tìm kiếm theo keyword: tên hoặc mã tài sản
    if (params.keyword) {
      qb.andWhere(
        '(asset.documentCode LIKE :keyword OR asset.description LIKE :keyword OR category.name LIKE :keyword)',
        { keyword: `%${params.keyword}%` },
      );
    }

    const results = await qb.getMany();

    if (results.length === 0) {
      return {
        success: true,
        message: 'Không tìm thấy tài sản phù hợp với tiêu chí.',
        data: [],
      };
    }

    return {
      success: true,
      message: 'Lấy danh sách tài sản thành công.',
      data: results,
    };
  }
}
