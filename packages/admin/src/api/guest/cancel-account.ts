import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const deleteGuests = async (
  ids: string[],
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(`user/guests`, { data: { ids: ids } }, 'delete');
};
