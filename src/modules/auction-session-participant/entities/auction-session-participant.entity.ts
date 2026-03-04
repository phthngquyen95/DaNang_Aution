import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {
  DepositStatus,
  AuctionParticipantStatus,
} from '../../../common/constants/enums';
import { AuctionSession } from '../../auction-session/entities/auction-session.entity';
import { User } from '../../user/entities/user.entity';

@Entity('auction_session_participants')
export class AuctionSessionParticipant {
  @PrimaryColumn({ name: 'user_id' })
  userId!: number;

  @PrimaryColumn({ name: 'auction_session_id' })
  auctionSessionId!: number;

  @Column()
  role!: string;

  @Column({
    type: 'enum',
    enum: AuctionParticipantStatus,
    default: AuctionParticipantStatus.NEW,
  })
  status!: AuctionParticipantStatus;

  @Column({
    type: 'enum',
    enum: DepositStatus,
    default: DepositStatus.PENDING,
    name: 'deposit_status',
  })
  depositStatus!: DepositStatus;

  @ManyToOne(() => AuctionSession, (session) => session.participants)
  @JoinColumn({ name: 'auction_session_id' })
  auctionSession!: AuctionSession;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
