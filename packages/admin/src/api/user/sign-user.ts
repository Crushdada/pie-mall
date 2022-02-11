import { ApiService } from '@/api';
import { UserProfileInterface } from '../../../../types/user/user-profile.interface';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const signUser = async (
  adminProfile: UserProfileInterface,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(`user`, { data: adminProfile }, 'POST');
};
