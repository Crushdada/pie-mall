import { ApiService } from '@/api';
import { UserProfileInterface } from '../../../../types/user/user-profile.interface';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const getUserProfile = async (
  adminTicket: string,
): Promise<ResponseBody<UserProfileInterface>> => {
  return ApiService.baseAction(
    `user`,
    { headers: { userTicket: adminTicket } },
    'GET',
  );
};
