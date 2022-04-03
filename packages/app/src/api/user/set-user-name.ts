import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const setUserName = async (
  userName: string,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(
    `user/name`,
    { data: { userName: userName } },
    'POST',
  );
};
