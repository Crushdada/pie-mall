import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const setDefaultAddress = (
  addressId: string,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(
    `user/default-address/${addressId}`,
    {},
    'PATCH',
  );
};
