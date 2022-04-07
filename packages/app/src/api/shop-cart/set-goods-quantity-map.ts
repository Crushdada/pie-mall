import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const setGoodsQuantityMap = async (
  goodsId: string,
  newQuantity: number,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(
    `shop-cart/${goodsId}`,
    {
      data: { newQuantity },
    },
    'PATCH',
  );
};
