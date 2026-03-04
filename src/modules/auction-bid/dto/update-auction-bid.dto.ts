import { PartialType } from '@nestjs/mapped-types';
import { CreateAuctionBidDto } from './create-auction-bid.dto';

export class UpdateAuctionBidDto extends PartialType(CreateAuctionBidDto) {}
