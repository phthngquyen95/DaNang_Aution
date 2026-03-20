// src/modules/auction-bid/auction-bid.service.ts
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuctionBid } from './entities/auction-bid.entity';
import { Repository } from 'typeorm';
import { AuctionSession } from '../auction-session/entities/auction-session.entity';
import { AuctionSessionParticipant } from '../auction-session-participant/entities/auction-session-participant.entity';
import {
  AuctionDocumentStatus,
  AuctionParticipantStatus,
} from '../../common/constants/enums';
@Injectable()
export class AuctionBidService {
  constructor(
    @InjectRepository(AuctionBid)
    private readonly bidRepo: Repository<AuctionBid>,

    @InjectRepository(AuctionSession)
    private readonly sessionRepo: Repository<AuctionSession>,

    @InjectRepository(AuctionSessionParticipant)
    private readonly participantRepo: Repository<AuctionSessionParticipant>,
  ) {}

  async getBidsBySession(sessionId: number, page: number = 1, limit: number = 20) {
    const [bids, total] = await this.bidRepo.findAndCount({
      where: { session: { id: sessionId } },
      skip: (page - 1) * limit,
      take: limit,
      order: { timestamp: 'DESC' },
      relations: ['user'],
    });

    return {
      data: bids,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async submitBidManually(sessionId: number, userId: number, price: number) {
    // 1. Kiểm tra phiên đấu giá còn hoạt động
    const session = await this.sessionRepo.findOne({
      where: {
        id: sessionId,
        status: AuctionDocumentStatus.ACTIVE as any,
      },
      relations: ['document'],
    });
    if (!session) throw new ConflictException('Auction not working');

    // 2. Kiểm tra user có được duyệt tham gia
    const participant = await this.participantRepo.findOne({
      where: {
        auctionSession: { id: sessionId },
        user: { id: userId },
        status: AuctionParticipantStatus.APPROVED,
      },
    });
    if (!participant)
      throw new ForbiddenException(
        'You have not been approved to join the session.',
      );

    // 3. Lấy giá hiện tại
    const highestBid = await this.bidRepo.findOne({
      where: { session: { id: sessionId } },
      order: { price: 'DESC' },
    });
    const currentPrice =
      highestBid?.price ?? session.document?.startingPrice ?? 0;
    const stepPrice = session.document?.stepPrice ?? 0;

    // 4. Kiểm tra giá hợp lệ
    if ((price - currentPrice) % stepPrice !== 0) {
      throw new BadRequestException(
        `Price must be greater ${currentPrice + stepPrice}`,
      );
    }

    // 5. Lưu bid
    const newBid = this.bidRepo.create({
      session,
      user: { id: userId },
      price,
      timestamp: new Date(),
    });
    await this.bidRepo.save(newBid);

    return { message: 'Bid successfully', price };
  }
}
