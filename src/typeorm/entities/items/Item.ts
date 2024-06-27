import { Category } from 'src/utils/types';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../users/User';

@Entity({ name: 'items' })
export class Item {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  category: Category;

  @ManyToOne(() => User, (user) => user.items)
  user: User;
}
