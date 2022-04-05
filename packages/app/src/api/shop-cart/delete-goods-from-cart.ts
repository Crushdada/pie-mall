import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { isString } from '@/utils/getType';
export const deleteGoodsFromCart = async (
  idTuple: string | Array<string>,
): Promise<ResponseBody<any>> => {
  if (isString(idTuple))
    return ApiService.baseAction(`shop-cart/${idTuple}`, {}, 'DELETE');
  else return ApiService.baseAction(`shop-cart`, { data: idTuple }, 'DELETE');
};
