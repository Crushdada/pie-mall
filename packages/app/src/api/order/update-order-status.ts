import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { OrderStatus } from '../../../../types/order/order-status.enum';

export const payForOrder = (orderId: string): Promise<ResponseBody<any>> => {
  return setOrderStatus(orderId, OrderStatus.TO_SEND);
};

export const fulfillOrder = (orderId: string): Promise<ResponseBody<any>> => {
  return setOrderStatus(orderId, OrderStatus.COMPLETED);
};

export const setOrderStatus = (
  orderId: string,
  status: OrderStatus,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(`order/${orderId}/${status}`, {}, 'PATCH');
};
