import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum ApproveStatus {
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class ApproveAssetDto {
  @IsEnum(ApproveStatus)
  status!: ApproveStatus;

  @IsOptional()
  @IsString()
  reason?: string;
}
