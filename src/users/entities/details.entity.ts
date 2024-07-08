import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('personal_details')
export class PersonalDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  religion: string;

  @Column({ nullable: true })
  caste: string;

  @Column({ nullable: true })
  subcaste: string;

  @Column({ nullable: true })
  height: string;

  @Column()
  complexion: string;

  @Column({ nullable: true })
  marital_status: string;

  @Column({ type: 'jsonb', nullable: true })
  pob: object;

  @Column({ type: 'jsonb', nullable: true })
  por: object;

  @Column()
  nationality: string;

  @Column()
  user_id: number;
}
