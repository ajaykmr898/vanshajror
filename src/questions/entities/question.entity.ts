import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Choice, ChoiceResponse } from './choice.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  question_text: string;

  @Column({ type: 'varchar', length: 20 })
  question_type: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date;

  //@OneToMany(() => Choice, (choice) => choice.question)
  choices: ChoiceResponse[];

  //@OneToMany(() => Response, (response) => response.question)
  //responses: Response[];
}

export class QuestionResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  question_text: string;

  @UpdateDateColumn({ type: 'text' })
  question_type: string;

  choices: ChoiceResponse[];
}
