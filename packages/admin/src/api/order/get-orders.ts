import { ApiService } from '@/api';
import { OrderInterface } from '../../../../types/order/order.interface';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const getAllOrders = (): Promise<
  ResponseBody<Partial<OrderInterface>[]>
> => {
  return ApiService.baseAction(`order`, {}, 'GET');
};
