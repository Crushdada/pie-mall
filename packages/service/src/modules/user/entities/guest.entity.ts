import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { GuestRole } from '../enums/role.enum';
import { UserProfile } from './user.base.entity';
import { ReceivingAddress } from './guest-address.entity';
import { Order } from '../../order/entities/order.entity';
import { ShopCart } from '../../shop-cart/entities/shop-cart.entity';
@Entity()
export class Guest extends UserProfile {
  /**
   * 用户角色: vip | guest
   */
  @Column({
    type: 'enum',
    enum: GuestRole,
    default: GuestRole.GUEST,
  })
  role: GuestRole;

  /**
   * 默认收货地址
   */
  @OneToOne(() => ReceivingAddress, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  default_address: ReceivingAddress;

  /**
   * 收货地址
   */
  @OneToMany(() => ReceivingAddress, ReceivingAddress => ReceivingAddress.user)
  receiving_address: ReceivingAddress[];

  /**
   * 订单记录
   */
  @OneToMany(() => Order, Order => Order.guest)
  orders: Order[];

  /**
   * 购物车
   */
  @OneToOne(() => ShopCart, { eager: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  shop_cart: ShopCart;
}
