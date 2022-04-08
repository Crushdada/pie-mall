import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { GoodsInterface } from '../../../../types/goods/goods.interface';

export const getGoodsById = async (
  id: string,
): Promise<ResponseBody<Partial<GoodsInterface>>> => {
  return ApiService.baseAction(`goods/${id}`, {}, 'GET');
};
