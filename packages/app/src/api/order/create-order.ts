import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const createOrder = (
  goodsMapIds: Array<string>,
): Promise<ResponseBody<{ orderId: string; expiredTime: number }>> => {
  return ApiService.baseAction(`order`, { data: goodsMapIds }, 'POST');
};
