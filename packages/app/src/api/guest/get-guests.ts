import { ApiService } from '@/api';
import { UserProfileInterface } from '../../../../types/user/user-profile.interface';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const getProfilesOfGuests = async (): Promise<
  ResponseBody<Partial<UserProfileInterface>[]>
> => {
  return ApiService.baseAction(`user/guests`, {}, 'GET');
};
