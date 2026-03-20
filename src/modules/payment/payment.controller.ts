// src/modules/payment/payment.controller.ts
import { Controller, Post, Get, Body, UseGuards, Req, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('api/payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async findAll(
    @Req() req: Express.Request & { user: { id: number } },
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.paymentService.findByUser(req.user.id, page, limit);
  }

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
