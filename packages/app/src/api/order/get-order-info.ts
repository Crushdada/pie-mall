import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const getOrderInfo = (id: string): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(`order/${id}`, {}, 'GET');
};
