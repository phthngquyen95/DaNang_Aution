import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AuctionDocument } from '../../auction-document/entities/auction-document.entity';
import {
  UserStatus,
  Gender,
  UserRole,
  AccountType,
} from '../../../common/constants/enums';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true, name: 'phone_number' })
  phoneNumber!: string;

  @Column({ nullable: true, name: 'first_name' })
  firstName!: string;

  @Column({ nullable: true, name: 'middle_name' })
  middleName!: string;

  @Column({ nullable: true, name: 'last_name' })
  lastName!: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender!: Gender;

  @Column({ type: 'date', nullable: true })
  dob!: string;

  @Column({ nullable: true })
  province!: string;

  @Column({ nullable: true })
  district!: string;

  @Column({ nullable: true })
  ward!: string;

  @Column({ nullable: true, name: 'detailed_address' })
  detailedAddress!: string;

  @Column({ nullable: true, name: 'identity_number' })
  identityNumber!: string;

  @Column({ type: 'date', nullable: true, name: 'identity_issue_date' })
  identityIssueDate!: string;

  @Column({ nullable: true, name: 'identity_issue_place' })
  identityIssuePlace!: string;

  @Column({ nullable: true, name: 'bank_account_number' })
  bankAccountNumber!: string;

  @Column({ nullable: true, name: 'bank_name' })
  bankName!: string;

  @Column({ nullable: true, name: 'bank_account_holder' })
  bankAccountHolder!: string;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.PERSONAL,
    name: 'account_type',
  })
  accountType!: AccountType;

  @Column({ default: false })
  verified!: boolean;

  @Column({ type: 'enum', enum: UserRole })
  role!: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Column({ nullable: true, name: 'reset_token' })
  resetToken!: string;

  @Column({ type: 'datetime', nullable: true, name: 'reset_token_expiry' })
  resetTokenExpiry!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ name: 'rejected_reason', type: 'text', nullable: true })
  rejectedReason?: string;

  @Column({ type: 'datetime', nullable: true, name: 'verified_at' })
  verifiedAt!: Date;

  @OneToMany(() => AuctionDocument, (auctionDocument) => auctionDocument.user)
  auctionDocuments!: AuctionDocument[];
  @Column({ name: 'identity_front_url', nullable: true })
  identityFrontUrl?: string;

  @Column({ name: 'identity_back_url', nullable: true })
  identityBackUrl?: string;
}
