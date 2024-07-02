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

  /*@ManyToOne(() => Response, (response) => response.responseChoices)
  response: Response;

  @ManyToOne(() => Choice, (choice) => choice.id)
  choice: Choice;*/

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date;
}
