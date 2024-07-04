import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  types: string;

  @Column()
  user_id: number;

  //@ManyToOne(() => User, { nullable: true })
  owner: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  from: Date;

  @Column({ type: 'date', nullable: true })
  to: Date;

  @Column({ type: 'numeric', nullable: true })
  salary: number;

  @Column({ type: 'numeric', nullable: true })
  charge: number;

  @Column({ default: 0 })
  viewed: number;

  @Column({ default: false })
  deleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
