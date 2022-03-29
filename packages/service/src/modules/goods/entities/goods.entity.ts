import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
@Entity()
export class Goods {
  @PrimaryGeneratedColumn('uuid')
  G_id: string;

  @Column()
  G_category: string;

  @Column({ nullable: true })
  G_thumb: string;

  @Column()
  G_info?: string;

  @Column({ type: 'int' })
  G_price: number;

  @Column({ type: 'int' })
  G_stock: number;
}
