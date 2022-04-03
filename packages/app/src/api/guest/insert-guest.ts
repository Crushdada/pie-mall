import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { UserProfileInterface } from '../../../../types/user/user-profile.interface';

export const insertGuest = async (
  userProfile: Partial<UserProfileInterface>,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(
    `user/guest`,
    { data: { userProfile: userProfile } },
    'post',
  );
};
