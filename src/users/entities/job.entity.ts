// job.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('job')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column()
  salary: number;

  @Column({ default: false })
  is_remote: boolean;

  @Column()
  user_id: number;
}
