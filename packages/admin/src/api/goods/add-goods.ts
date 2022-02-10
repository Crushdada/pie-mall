import { ApiService } from '@/api'; // 配置了path：@ => src
import { GoodsInterface } from '../../../../types/goods/goods.interface';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const addGoods = async (
  goodsList: Array<GoodsInterface>,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(`goods`, { data: goodsList }, 'POST');
};
