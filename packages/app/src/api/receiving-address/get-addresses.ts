import { ApiService } from '@/api';
import { AddressInfo } from '../../../../types/receiving-addrees/address.interface';
import { ResponseBody } from '../../../../types/response/response-body.interface';

interface getAddressesInterface {
  addressList: Array<AddressInfo>;
  defaultAddress: AddressInfo;
}

export const getAddresses = (): Promise<
  ResponseBody<getAddressesInterface>
> => {
  return ApiService.baseAction('user/address', {}, 'GET');
};
