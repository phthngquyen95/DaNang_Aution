// src/modules/payment/entities/payment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { AuctionSession } from '../../auction-session/entities/auction-session.entity';
import { PaymentType, PaymentStatus } from '../../../common/constants/enums';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: PaymentType })
  type!: PaymentType;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status!: PaymentStatus;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price!: number;

  @Column({ name: 'qr_image_url', type: 'text', nullable: true })
  qrImageUrl?: string;

  @CreateDateColumn()
  timestamp!: Date;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column({ name: 'session_id' })
  sessionId!: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => AuctionSession, (session) => session.id)
  @JoinColumn({ name: 'session_id' })
  session!: AuctionSession;
}
