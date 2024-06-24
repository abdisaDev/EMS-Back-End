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

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
