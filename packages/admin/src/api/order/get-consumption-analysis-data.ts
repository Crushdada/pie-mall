import { ApiService } from '@/api';
import { UserConsumptionAnalysisData } from '../../../../types/data-analysis/user-consumption-analysis.interface';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const getConsumptionAnalysisData = (): Promise<
  ResponseBody<UserConsumptionAnalysisData>
> => {
  return ApiService.baseAction(`order/consumption/analysis`, {}, 'GET');
};
