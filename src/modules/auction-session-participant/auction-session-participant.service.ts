// src/modules/auction-session-participant/participation.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuctionSessionParticipant } from './entities/auction-session-participant.entity';
import { AuctionSession } from '../auction-session/entities/auction-session.entity';
import { AuctionParticipantStatus } from '../../common/constants/enums';
import { AuctionSessionStatus } from '../../common/constants/enums';
@Injectable()
export class AuctionSessionParticipantService {
  constructor(
    @InjectRepository(AuctionSessionParticipant)
    private readonly partRepo: Repository<AuctionSessionParticipant>,

    @InjectRepository(AuctionSession)
    private readonly sessionRepo: Repository<AuctionSession>,
  ) {}

  async approve(sessionId: number, participantId: number, organizerId: number) {
    const session = await this.sessionRepo.findOne({
      where: { id: sessionId },
    });

    if (!session) throw new NotFoundException('Phiên đấu giá không tồn tại');
    if (session.createdBy !== organizerId) {
      throw new ForbiddenException('Bạn không có quyền duyệt phiên này');
    }

    const participant = await this.partRepo.findOne({
      where: {
        userId: participantId,
        auctionSessionId: sessionId,
      },
    });

    if (!participant)
      throw new NotFoundException('Hồ sơ tham gia không tồn tại');

    participant.status = AuctionParticipantStatus.APPROVED;
    return this.partRepo.save(participant);
  }

  //Gửi hồ sơ đăng ký phiên đấu giá
  async submitParticipation(userId: number, sessionId: number) {
    const session = await this.sessionRepo.findOne({
      where: { id: sessionId },
    });
    if (!session) {
      throw new NotFoundException('Auction session not found');
    }

    if (session.status === AuctionSessionStatus.FINISHED) {
      throw new BadRequestException('Auction session already completed');
    }

    const existing = await this.partRepo.findOne({
      where: {
        user: { id: userId },
        auctionSessionId: sessionId,
      },
    });

    if (existing) {
      throw new ConflictException('Participation already submitted');
    }

    const participation = this.partRepo.create({
      user: { id: userId },
      auctionSession: { id: sessionId },
      status: AuctionParticipantStatus.NEW,
    });

    await this.partRepo.save(participation);
    return { message: 'Participation submitted' };
  }
}
