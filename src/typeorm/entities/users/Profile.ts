import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gate_entry_time: Date;

  @Column()
  gate_exit_time: Date;

  @Column()
  compound_stay_time: Date;
}
