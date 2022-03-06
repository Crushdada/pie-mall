import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  account: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;
}
