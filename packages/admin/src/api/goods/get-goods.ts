import { ApiService } from '@/api';
import { GoodsInterface } from '../../../../types/goods/goods.interface';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const getAllGoods = async (): Promise<
  ResponseBody<Partial<GoodsInterface>[]>
> => {
  return ApiService.baseAction(`goods`, {}, 'GET');
};
