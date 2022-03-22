import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { Guest } from '../../user/entities/guest.entity';
import { Goods } from '../../goods/entities/goods.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 下单用户 与用户ManyToOne
   */
  @ManyToOne(() => Guest, Guest => Guest.orders, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  guest: Guest;

  /**
   * 商品列表 与商品ManyToMany
   */
  @ManyToMany(() => Goods, Goods => Goods.orderList, {
    eager: true,
  })
  @JoinTable()
  goodsList: Goods[];

  /**
   * 状态
   */
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.TO_PAY,
  })
  status: OrderStatus;

  /**
   * 下单时间
   */
  @Column({
    name: 'datefield',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 6,
  })
  timeStamp: Date;
}
