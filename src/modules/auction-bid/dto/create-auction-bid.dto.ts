import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAuctionBidDto {
  @IsNotEmpty()
  @IsNumber()
  price!: number;
}
