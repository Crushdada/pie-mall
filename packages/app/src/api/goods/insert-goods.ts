import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { GoodsInterface } from '../../../../types/goods/goods.interface';
/**
 * 用于商品批量入库
 * @param goodData 
 */
export const insertGoods = async (
  goodData: Partial<GoodsInterface>,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(`goods`, { data: goodData }, 'POST');
};
