import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { AddressInfo } from '../../../../types/receiving-addrees/address.interface';
export const insertAddress = (
  addressInfo: AddressInfo,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(
    'user/address',
    {
      data: addressInfo,
    },
    'POST',
  );
};
