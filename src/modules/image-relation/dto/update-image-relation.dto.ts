import { PartialType } from '@nestjs/mapped-types';
import { CreateImageRelationDto } from './create-image-relation.dto';

export class UpdateImageRelationDto extends PartialType(
  CreateImageRelationDto,
) {}
