import { GoodsInterface } from "../goods/goods.interface";

export interface ShopCartGoods {
  id: string;
  goodsId: string;
  thumb: string;
  name: string;
  price: string;
  quantity: string;
}
export type ShopCartInterface = Array<ShopCartGoods>;
