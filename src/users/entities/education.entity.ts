import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  education_level: string;

  @Column({ nullable: true })
  college: string;

  @Column({ nullable: true })
  degree: string;

  @Column({ nullable: true })
  specialization: string;

  @Column({ nullable: true })
  graduation_year: number;

  @Column()
  user_id: number;
}
