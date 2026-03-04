import { IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';

export enum VerifyStatus {
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export class VerifyUserDto {
  @IsEnum(VerifyStatus)
  status!: VerifyStatus;

  @ValidateIf((o) => o.status === VerifyStatus.REJECTED)
  @IsNotEmpty({
    message: 'Lý do từ chối là bắt buộc nếu trạng thái là rejected',
  })
  reason?: string;
}
