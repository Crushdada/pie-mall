import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { Guest } from '../../user/entities/guest.entity';
import { CartGoodsMap } from '../../shop-cart/entities/cart-goods-map.entity';
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
   * one to many 一个订单拥有多对商品<=>数目映射
   */
  @OneToMany(() => CartGoodsMap, cartGoodsMap => cartGoodsMap.order)
  goods_maps: CartGoodsMap[];

  /**
   * 状态
   */
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.TO_PAY,
  })
  status: OrderStatus;

  @Column()
  address: string;

  /**
   * 下单时间
   */
  // @Column({
  //   type: 'timestamp',
  //   default: () => new Date().getTime(),
  //   precision: 6,
  // })

  @CreateDateColumn()
  timeStamp: Date;
}
