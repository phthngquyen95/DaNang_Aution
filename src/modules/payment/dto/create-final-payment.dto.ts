import { IsNumber, IsPositive } from 'class-validator';

export class CreateFinalPaymentDto {
  @IsNumber()
  session_id!: number;

  @IsNumber()
  @IsPositive()
  price!: number;
}
