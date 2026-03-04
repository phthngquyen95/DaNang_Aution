import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import {
  AuctionDocumentStatus,
  AuctionType,
} from '../../../common/constants/enums';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import { AuctionSession } from '../../auction-session/entities/auction-session.entity';

@Entity('auction_documents')
export class AuctionDocument {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'document_code', unique: true })
  documentCode!: string;

  @Column({ type: 'decimal', name: 'deposit_amount', nullable: true })
  depositAmount!: number;

  @Column({ default: true, name: 'is_deposit_required' })
  isDepositRequired!: boolean;

  @Column({
    type: 'enum',
    enum: AuctionDocumentStatus,
    default: AuctionDocumentStatus.PENDING_APPROVAL,
  })
  status!: AuctionDocumentStatus;

  @Column({
    type: 'enum',
    enum: AuctionType,
    default: AuctionType.PUBLIC,
    name: 'auction_type',
  })
  auctionType!: AuctionType;

  @Column({ name: 'registered_at', type: 'datetime', nullable: true })
  registeredAt!: Date;

  @Column({ nullable: true })
  description!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ name: 'session_id', nullable: true })
  sessionId!: number;

  @Column({ name: 'user_id', nullable: true })
  userId!: number;

  @Column({ name: 'category_id', nullable: true })
  categoryId!: number;

  @ManyToOne(() => User, (user) => user.auctionDocuments)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'rejected_reason', type: 'varchar', nullable: true })
  rejectedReason?: string;

  @Column({ name: 'start_time', type: 'datetime', nullable: true })
  startTime!: Date;

  @Column({ name: 'end_time', type: 'datetime', nullable: true })
  endTime!: Date;

  @ManyToOne(() => Category, (category) => category.documents)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @Column({
    nullable: true,
    name: 'starting_price',
    type: 'decimal',
    precision: 15,
    scale: 2,
  })
  startingPrice?: number; // Giá khởi điểm của tài liệu đấu giá

  @Column({
    nullable: true,
    name: 'step_price',
    type: 'decimal',
    precision: 15,
    scale: 2,
  })
  stepPrice?: number; // Bước giá tăng tối thiểu khi đấu giá

  @OneToOne(() => AuctionSession, {
    nullable: true,
  })
  @JoinColumn({ name: 'session_id' })
  session?: AuctionSession;
}
