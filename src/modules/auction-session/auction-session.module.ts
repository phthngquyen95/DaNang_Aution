import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionSessionService } from './auction-session.service';
import { AuctionSessionController } from './auction-session.controller';
import { AuctionSession } from './entities/auction-session.entity';
import { User } from '../user/entities/user.entity';
import { AuctionDocument } from '../auction-document/entities/auction-document.entity';
import { SessionStatusCron } from './session-status.cron';

@Module({
  imports: [TypeOrmModule.forFeature([AuctionSession, User, AuctionDocument])],
  controllers: [AuctionSessionController],
  providers: [AuctionSessionService, SessionStatusCron],
  exports: [AuctionSessionService],
})
export class AuctionSessionModule {}
