import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { ResponseChoice } from './response-choice.entity';

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'text', nullable: true })
  response_text: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date;

  /*@ManyToOne(() => Question, (question) => question.responses)
  question: Question;

  @OneToMany(() => ResponseChoice, (responseChoice) => responseChoice.response)
  responseChoices: ResponseChoice[];*/
}
