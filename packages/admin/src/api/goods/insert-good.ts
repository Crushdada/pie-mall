import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { GoodsInterface } from '../../../../types/goods/goods.interface';
/**
 * 用于后台单个新增商品
 * @param goodData 
 */
export const insertGood = async (
  goodData: Partial<GoodsInterface>,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(`goods/atom`, { data: goodData }, 'POST');
};
