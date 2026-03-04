import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  // ManyToOne,
  // JoinColumn,
  OneToOne,
} from 'typeorm';
import {
  // AuctionDocumentStatus,
  AuctionType,
  AuctionSessionStatus,
} from '../../../common/constants/enums';
import { AuctionDocument } from '../../auction-document/entities/auction-document.entity';
import { AuctionSessionParticipant } from '../../auction-session-participant/entities/auction-session-participant.entity';

@Entity('auction_sessions')
export class AuctionSession {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, name: 'session_code' })
  sessionCode!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({
    type: 'enum',
    enum: AuctionType,
    default: AuctionType.PUBLIC,
  })
  type!: AuctionType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ name: 'created_by' })
  createdBy!: number;

  @Column({
    type: 'enum',
    enum: AuctionSessionStatus,
    default: AuctionSessionStatus.DRAFT,
  })
  status!: AuctionSessionStatus;

  @OneToMany(
    () => AuctionSessionParticipant,
    (participant) => participant.auctionSession,
  )
  participants!: AuctionSessionParticipant[];

  @OneToOne(() => AuctionDocument, (doc) => doc.session)
  document!: AuctionDocument;

  @Column({ name: 'start_time', type: 'datetime', nullable: true })
  startTime!: Date;

  @Column({ name: 'end_time', type: 'datetime', nullable: true })
  endTime!: Date;
}
