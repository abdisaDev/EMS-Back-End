import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsEmpty, IsStrongPassword } from 'class-validator';
import { Item } from '../items/Item';
import { Profile } from './Profile';

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

  @Column({ unique: true })
  @IsEmpty()
  phone_number: string;

  @Column()
  @IsEmpty()
  role: string;

  @Column()
  @IsStrongPassword()
  password: string;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
