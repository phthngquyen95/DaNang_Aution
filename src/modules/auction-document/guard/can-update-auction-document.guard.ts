import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuctionDocument } from '../entities/auction-document.entity';
import { Repository } from 'typeorm';
import {
  AuctionDocumentStatus,
  UserRole,
} from '../../../common/constants/enums';

@Injectable()
export class CanUpdateAuctionDocumentGuard implements CanActivate {
  constructor(
    @InjectRepository(AuctionDocument)
    private readonly auctionRepo: Repository<AuctionDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const docId = Number(request.params.id);

    const document = await this.auctionRepo.findOneBy({ id: docId });
    if (!document) throw new NotFoundException('Tài sản không tồn tại');

    if (
      user.role === UserRole.ORGANIZER &&
      document.status !== AuctionDocumentStatus.PENDING_CREATE
    ) {
      throw new ForbiddenException(
        'Organizer không thể cập nhật khi tài sản đã gửi duyệt',
      );
    }

    return true;
  }
}
