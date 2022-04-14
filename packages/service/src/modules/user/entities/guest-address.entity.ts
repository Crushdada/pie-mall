import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Guest } from './guest.entity';

@Entity()
export class ReceivingAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  consignee_name: string;

  @Column()
  phone: string;

  @ManyToOne(() => Guest, Guest => Guest.receiving_address, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: Guest;
}
