// src/modules/payment/payment.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuctionSession } from '../auction-session/entities/auction-session.entity';
import { User } from '../user/entities/user.entity';
import { AuctionBid } from '../auction-bid/entities/auction-bid.entity';
import { PaymentType, PaymentStatus } from '../../common/constants/enums';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,

    @InjectRepository(AuctionSession)
    private readonly sessionRepo: Repository<AuctionSession>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(AuctionBid)
    private readonly bidRepo: Repository<AuctionBid>,
  ) {}

  private generateQRLink(price: number, paymentCode: string): string {
    const bank = 'vietcombank';
    const account = '9935508198';
    const template = 'qr_only';
    const accountName = encodeURIComponent('THANH TOAN HOA DON');
    const addInfo = encodeURIComponent(paymentCode);
    return `https://img.vietqr.io/image/${bank}-${account}-${template}.png?amount=${price}&addInfo=${addInfo}&accountName=${accountName}`;
  }

  async create(userId: number, dto: CreatePaymentDto) {
    const session = await this.sessionRepo.findOne({
      where: { id: dto.session_id },
    });
    if (!session) throw new NotFoundException('Phiên không tồn tại');

    // Nếu là thanh toán FINAL, kiểm tra người thắng
    if (dto.type === PaymentType.FINAL) {
      const winnerBid = await this.bidRepo.findOne({
        where: { session: { id: dto.session_id } },
        order: { price: 'DESC' },
      });
      if (!winnerBid || winnerBid.user.id !== userId) {
        throw new ForbiddenException('Bạn không phải người thắng cuộc');
      }
    }

    const payment = this.paymentRepo.create({
      type: dto.type,
      price: dto.price,
      userId,
      sessionId: dto.session_id,
      status: PaymentStatus.PENDING,
    });

    const saved = await this.paymentRepo.save(payment);

    // Tạo QR
    const qr = this.generateQRLink(dto.price, `PAYMENT-${saved.id}`);
    saved.qrImageUrl = qr;
    await this.paymentRepo.save(saved);

    return {
      message: 'Tạo giao dịch thành công',
      payment: saved,
    };
  }
}
