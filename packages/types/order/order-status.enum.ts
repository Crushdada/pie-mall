/**
 * 订单状态枚举
 * @enum {*} string
 */
export enum OrderStatus {
  /**
   * 下单后的状态
   */
  TO_PAY = 'to_pay',
  /**
   * 付款后的状态
   */
  TO_SEND = 'to_send',
  /**
   * 完成后的状态
   */
  COMPLETED = 'completed',
  /**
   * 触发退货后的状态
   */
  TO_RETURN = 'to_return',
}
