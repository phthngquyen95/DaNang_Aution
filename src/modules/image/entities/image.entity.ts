import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  url?: string;

  @Column({ name: 'public_id', nullable: true })
  publicId?: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  size?: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;
}
