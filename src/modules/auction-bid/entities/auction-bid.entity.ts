import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { AuctionSession } from '../../auction-session/entities/auction-session.entity';
import { User } from '../../user/entities/user.entity';

@Entity('auction_bids')
export class AuctionBid {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price!: number;

  @CreateDateColumn({ name: 'timestamp' })
  timestamp!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => AuctionSession)
  @JoinColumn({ name: 'session_id' })
  session!: AuctionSession;
}
