import { PartialType } from '@nestjs/mapped-types';
import { CreateAuctionSessionDto } from './create-auction-session.dto';

export class UpdateAuctionSessionDto extends PartialType(
  CreateAuctionSessionDto,
) {}
