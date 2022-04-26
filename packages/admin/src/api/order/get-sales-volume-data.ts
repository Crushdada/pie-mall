import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const getSalesVolumeAnalysisData = (): Promise<
  ResponseBody<Array<Array<any>>>
> => {
  return ApiService.baseAction(`order/sale-volume/analysis`, {}, 'GET');
};
