import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionBidService } from './auction-bid.service';
import { AuctionBidController } from './auction-bid.controller';
import { AuctionBid } from './entities/auction-bid.entity';
import { AuctionSession } from '../auction-session/entities/auction-session.entity';
import { AuctionSessionParticipant } from '../auction-session-participant/entities/auction-session-participant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuctionBid,
      AuctionSession,
      AuctionSessionParticipant,
    ]),
  ],
  controllers: [AuctionBidController],
  providers: [AuctionBidService],
})
export class AuctionBidModule {}
