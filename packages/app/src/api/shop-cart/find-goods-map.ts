import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const findGoodsMapOrNot = (
  goodsId: string,
): Promise<ResponseBody<boolean>> => {
  return ApiService.baseAction(`shop-cart/goods-map/${goodsId}`, {}, 'GET');
};
