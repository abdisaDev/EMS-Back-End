import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsEmpty, IsStrongPassword } from 'class-validator';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  first_name: string;

  @Column()
  @IsEmpty()
  last_name: string;

  @Column()
  @IsEmpty()
  phone_number: string;

  @Column()
  @IsEmpty()
  role: string;

  @Column()
  @IsEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsStrongPassword()
  password: string;

  @Column()
  @IsEmpty()
  creator: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
