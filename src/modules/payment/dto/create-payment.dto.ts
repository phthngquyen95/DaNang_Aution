// src/modules/payment/dto/create-payment.dto.ts
import { IsEnum, IsNumber } from 'class-validator';
import { PaymentType } from '../../../common/constants/enums';

export class CreatePaymentDto {
  @IsEnum(PaymentType)
  type!: PaymentType;

  @IsNumber()
  price!: number;

  @IsNumber()
  session_id!: number;
}
