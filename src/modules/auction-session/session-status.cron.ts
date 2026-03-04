// src/modules/auction-session/session-status.cron.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { AuctionSession } from './entities/auction-session.entity';
import { AuctionSessionStatus } from '../../common/constants/enums';

@Injectable()
export class SessionStatusCron {
  constructor(
    @InjectRepository(AuctionSession)
    private readonly sessionRepository: Repository<AuctionSession>,
  ) {}

  // Chạy mỗi phút
  @Cron('*/1 * * * *')
  async activateUpcomingSessions() {
    const now = new Date();

    const result = await this.sessionRepository.update(
      {
        status: AuctionSessionStatus.PENDING,
        startTime: LessThanOrEqual(now),
      },
      {
        status: AuctionSessionStatus.RUNNING,
      },
    );

    if (result.affected && result.affected > 0) {
      console.log(
        `✅ Đã chuyển ${result.affected} phiên sang trạng thái ACTIVE`,
      );
    }
  }
}
