import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Guest } from './guest.entity';

@Entity()
export class ReceivingAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @ManyToOne(() => Guest, Guest => Guest.receiving_address)
  user: Guest;
}
