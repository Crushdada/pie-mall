import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ShopCart } from './shop-cart.entity';
import { Goods } from '../../goods/entities/goods.entity';
import { Order } from '../../order/entities/order.entity';
@Entity()
export class CartGoodsMap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   *  many to one 一个购物车拥有多对商品<=>数目映射
   */
  @ManyToOne(() => ShopCart, shopCart => shopCart.goods_maps, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  cart: ShopCart;

  /**
   * 商品购买数目
   */
  @Column({ type: 'int' })
  quantity: number;

  /**
   * many to one 一种商品可以有多种映射记录
   */
  @ManyToOne(() => Goods, {
    eager: true,
  })
  good: Goods;

  /**
   * many to one 一个订单可以有多对商品<=>数目映射，需要有orderID区分哪次订单
   */
  @ManyToOne(() => Order, order => order.goods_maps, {
    cascade: true,
  })
  order: Order;
}
