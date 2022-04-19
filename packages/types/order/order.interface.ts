import { OrderStatus } from "./order-status.enum";

export interface OrderInterface {
  id: string;
  /**
   * 商品-数目映射
   */
  goods_maps: Array<any>;
  /**
   * 订单状态
   */
  status: OrderStatus;
  /**
   * 下单时间
   */
  timeStamp: Date;
  [propName: string]: any;
}
