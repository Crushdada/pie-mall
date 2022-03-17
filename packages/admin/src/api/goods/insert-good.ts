import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { GoodsInterface } from '../../../../types/goods/goods.interface';

export const insertGood = async (
  goodData: Partial<GoodsInterface>,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(`goods`, { data: goodData }, 'POST');
};
