import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const addGoodsQuantityMap = (
  goodsId: string,
  newQuantity: number,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(
    'shop-cart/goods',
    {
      data: { goodsId, newQuantity },
    },
    'POST',
  );
};
