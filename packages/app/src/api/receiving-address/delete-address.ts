import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const deleteAddress = (
  addressId: string,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(
    `user/address/${addressId}`,
    {},
    'DELETE',
  );
};
