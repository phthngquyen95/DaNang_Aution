// src/modules/payment/payment.controller.ts
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('api/payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: Express.Request & { user: { id: number } },
    @Body() dto: CreatePaymentDto,
  ) {
    if (req.user && typeof req.user.id === 'number') {
      return this.paymentService.create(req.user.id, dto);
    }
    throw new Error('Invalid user or user ID');
  }
}
