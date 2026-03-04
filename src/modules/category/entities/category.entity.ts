import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { AuctionDocument } from '../../auction-document/entities/auction-document.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Column({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Column({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => AuctionDocument, (doc) => doc.category)
  @JoinColumn({ name: 'category_id' })
  documents!: AuctionDocument[];
}
