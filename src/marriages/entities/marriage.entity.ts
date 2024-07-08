import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('marriage_requests')
export class Marriage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  address: object;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ length: 255 })
  job: string;

  @Column({ length: 255 })
  study: string;

  @Column({ length: 255 })
  gender: string;

  @Column({ length: 255, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  extra_info: string;

  //@ManyToOne(() => User, user => user.marriageRequests)
  @Column()
  owner_id: number;

  @Column({ length: 255, nullable: true })
  status: string;

  @Column({ default: false })
  deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
