import { PartialType } from '@nestjs/mapped-types';
import { CreateAuctionDocumentDto } from './create-auction-document.dto';

export class UpdateAuctionDocumentDto extends PartialType(
  CreateAuctionDocumentDto,
) {}
