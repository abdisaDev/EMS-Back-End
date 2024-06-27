import { Category } from 'src/utils/types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/User';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serial_number: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  category: Category;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.items)
  user: User;
}
