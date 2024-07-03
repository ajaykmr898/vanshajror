import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Response } from './response.entity';
import { Choice } from './choice.entity';

@Entity('response_choices')
export class ResponseChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  response_id: number;

  @Column({ type: 'text' })
  choice_id: number;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date;
}
