import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const getSalesRankingData = (): Promise<
  ResponseBody<Array<{ goodsName: string; consumption: string | number }>>
> => {
  return ApiService.baseAction(`order/sale-ranking/analysis`, {}, 'GET');
};
