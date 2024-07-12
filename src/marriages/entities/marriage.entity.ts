import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserFull } from '../../users/dto/create-user.dto';

@Entity('marriage_requests')
export class Marriage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  open_to_marriage: boolean;

  /*@Column({ type: 'jsonb', nullable: true })
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
  phone: string;*/

  user: UserFull;

  @Column({ type: 'text', nullable: true })
  extra_info: string;

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
