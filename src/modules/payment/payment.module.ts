import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { AuctionSession } from '../auction-session/entities/auction-session.entity';
import { User } from '../user/entities/user.entity';
import { AuctionBid } from '../auction-bid/entities/auction-bid.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, AuctionSession, User, AuctionBid]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
