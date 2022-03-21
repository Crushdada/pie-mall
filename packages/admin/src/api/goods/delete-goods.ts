import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { isString } from '../../utils/getType';
export const deleteGoods = async (
  idTuple: string | Array<string>,
): Promise<ResponseBody<any>> => {
  if (isString(idTuple))
    return ApiService.baseAction(`goods/${idTuple}`, {}, 'DELETE');
  else return ApiService.baseAction(`goods`, { data: idTuple }, 'DELETE');
};
