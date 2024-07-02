import {
  Entity,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('choices')
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  choice_text: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date;

  @Column()
  question_id: number;
}
