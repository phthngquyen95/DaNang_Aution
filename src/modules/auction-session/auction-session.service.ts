import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuctionSession } from './entities/auction-session.entity';
import { AuctionDocument } from '../auction-document/entities/auction-document.entity';
import { User } from '../user/entities/user.entity';
import { AuctionDocumentStatus } from '../../common/constants/enums';
import { validateAuctionTime } from './validators/auction-time.validator';

@Injectable()
export class AuctionSessionService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AuctionSession)
    private readonly sessionRepository: Repository<AuctionSession>,
    @InjectRepository(AuctionDocument)
    private readonly documentRepository: Repository<AuctionDocument>,
  ) {}

  async createSessionFromApprovedAsset(
    asset: AuctionDocument,
  ): Promise<Partial<AuctionSession>> {
    const user = await this.userRepository.findOneBy({ id: asset.userId });
    if (!user) {
      throw new Error(`Người dùng ID ${asset.userId} không tồn tại`);
    }

    validateAuctionTime(asset.startTime, asset.endTime);

    const session = this.sessionRepository.create({
      sessionCode: `AUC-${Date.now()}`,
      title: `Phiên đấu giá - ${asset.documentCode}`,
      description: asset.description || 'Phiên đấu giá từ tài sản được duyệt',
      status: AuctionDocumentStatus.UPCOMING,
      type: asset.auctionType,
      startTime: asset.startTime,
      endTime: asset.endTime,
      createdBy: user,
    } as unknown as Partial<AuctionSession>);
    const savedSession =
      await this.sessionRepository.save<AuctionSession>(session);

    asset.sessionId = savedSession.id as unknown as number;
    await this.documentRepository.save(asset);

    console.log('🧾 Đang tạo phiên cho tài sản:', asset.documentCode);
    console.log('👤 User tổ chức:', user.id, user.username);
    console.log('⏰ Thời gian phiên:', session.startTime, '-', session.endTime);

    return savedSession;
  }
}
