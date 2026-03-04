// src/auth/entities/revoked-token.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('revoked_tokens')
export class RevokedToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  token!: string;

  @CreateDateColumn()
  created_at!: Date;
}
