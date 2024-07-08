import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../auth/models/roles.model';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false, nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @Column({ name: 'first_name', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', length: 255 })
  lastName: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ select: false, nullable: true })
  regcode: string;

  @Column({ nullable: true })
  reqcodeexptime: string;

  @Column({ select: false, nullable: true })
  reglink: string;

  @Column({ nullable: true })
  reglinkexptime: string;

  @Column({ default: 0 })
  issignedup: string;

  @Column({ nullable: true })
  resetpasslink: string;

  @Column({ nullable: true })
  resetpasslinkexptime: string;

  /*@Column({ type: 'jsonb', nullable: true })
  pob: object;

  @Column({ type: 'jsonb', nullable: true })
  por: object;*/

  @Column({ nullable: true })
  level: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ select: false, default: false })
  deleted: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ADMIN,
  })
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
