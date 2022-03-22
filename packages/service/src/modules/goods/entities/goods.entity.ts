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

  @Column()
  G_price: number;

  @Column()
  G_stock: number;

  /**
   * 订单列表
   */
  @ManyToMany(() => Order, Order => Order.goodsList)
  orderList: Order[];
}
