import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const setGoodsQuantityMap = async (
  goodsMapId: string,
  newQuantity: number,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(
    `shop-cart/${goodsMapId}`,
    {
      data: { newQuantity },
    },
    'PATCH',
  );
};
