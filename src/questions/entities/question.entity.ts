import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Choice } from './choice.entity';
import { Response } from './response.entity';

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
  //choices: Choice[];

  //@OneToMany(() => Response, (response) => response.question)
  //responses: Response[];
}
