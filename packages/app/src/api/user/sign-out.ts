import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const signOut = async (
  adminTicket: string,
): Promise<ResponseBody<any>> => {
  return ApiService.baseAction(
    `user/userSession`,
    { headers: { userTicket: adminTicket } },
    'DELETE',
  );
};
