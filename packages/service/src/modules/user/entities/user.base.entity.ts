import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  account: string;

  @Column()
  password: string;
}
