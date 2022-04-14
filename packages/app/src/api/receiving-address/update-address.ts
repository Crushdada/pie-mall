import { ApiService } from '@/api';
import { AddressInfo } from '../../../../types/receiving-addrees/address.interface';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const updateAddress = (
  addressInfo: AddressInfo,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction('user/address', { data: addressInfo }, 'PUT');
};
