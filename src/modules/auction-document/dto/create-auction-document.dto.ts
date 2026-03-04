import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsEnum,
  Validate,
} from 'class-validator';

import { AuctionType } from '../../../common/constants/enums';
import { validateAuctionType } from '../validators/is-valid-restricted-asset.validator';

export class CreateAuctionDocumentDto {
  @IsNotEmpty()
  @IsString()
  document_code!: string;

  @IsNotEmpty()
  @IsNumber()
  deposit_amount!: number;

  @IsOptional()
  @IsBoolean()
  is_deposit_required?: boolean;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsEnum(AuctionType, {
    message: 'auction_type must be PUBLIC, PRIVATE',
  })
  auction_type?: AuctionType;

  @IsNotEmpty()
  @IsNumber()
  @Validate(validateAuctionType)
  starting_price!: number;

  @IsNotEmpty()
  @IsNumber()
  step_price!: number;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'registered_at must be a valid ISO date string' },
  )
  registered_at?: string;

  @IsOptional()
  @IsDateString()
  start_time?: string;

  @IsOptional()
  @IsDateString()
  end_time?: string;

  @IsOptional()
  @IsNumber()
  session_id?: number;

  @IsOptional()
  @IsNumber()
  category_id?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
