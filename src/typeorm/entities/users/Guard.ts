import { IsEmail, IsEmpty, IsStrongPassword } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'guards' })
export class Guard {
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
  role: string;

  @Column()
  @IsEmpty()
  phone_number: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
