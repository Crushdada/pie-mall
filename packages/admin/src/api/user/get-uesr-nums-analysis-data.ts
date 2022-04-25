import { ApiService } from '@/api';
import { UserAnalysisInterface } from '../../../../types/data-analysis/user-analysis.interface';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const getUserNumsAnalysisData = (): Promise<
  ResponseBody<UserAnalysisInterface>
> => {
  return ApiService.baseAction('user/analysis', {}, 'GET');
};
