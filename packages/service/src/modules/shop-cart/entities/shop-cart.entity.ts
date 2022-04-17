import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartGoodsMap } from './cart-goods-map.entity';
@Entity()
export class ShopCart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * one to many 一个订单拥有多对商品<=>数目映射
   */
  @OneToMany(() => CartGoodsMap, CartGoodsMap => CartGoodsMap.cart, {
    eager: true,
  })
  goods_maps: CartGoodsMap[];
}
