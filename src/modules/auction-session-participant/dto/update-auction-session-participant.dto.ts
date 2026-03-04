import { PartialType } from '@nestjs/mapped-types';
import { CreateAuctionSessionParticipantDto } from './create-auction-session-participant.dto';

export class UpdateAuctionSessionParticipantDto extends PartialType(
  CreateAuctionSessionParticipantDto,
) {}
