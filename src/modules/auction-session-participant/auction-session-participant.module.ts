import { Module } from '@nestjs/common';
import { AuctionSessionParticipantService } from './auction-session-participant.service';
import { AuctionSessionParticipantController } from './auction-session-participant.controller';

@Module({
  controllers: [AuctionSessionParticipantController],
  providers: [AuctionSessionParticipantService],
})
export class AuctionSessionParticipantModule {}
