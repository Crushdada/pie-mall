import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from '../../../../../types/order/order-status.enum';
import { Guest } from '../../user/entities/guest.entity';
import { CartGoodsMap } from '../../shop-cart/entities/cart-goods-map.entity';
import { ReceivingAddress } from '../../user/entities/guest-address.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 下单用户 与用户ManyToOne
   */
  @ManyToOne(() => Guest, Guest => Guest.orders, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  guest: Guest;

  /**
   * one to many 一个订单拥有多对商品<=>数目映射
   */
  @OneToMany(() => CartGoodsMap, cartGoodsMap => cartGoodsMap.order, {
    eager: true,
  })
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

  /**
   * 订单收货人地址信息
   */
  @ManyToOne(() => ReceivingAddress, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  address: ReceivingAddress;

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
