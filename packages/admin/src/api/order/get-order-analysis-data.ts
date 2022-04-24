import { ApiService } from '@/api';
import { OrderAnalysisInterface } from '../../../../types/data-analysis/order-analysis.interface';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const getOrderAnalysisData = (
  recentDays: number,
): Promise<ResponseBody<OrderAnalysisInterface>> => {
  return ApiService.baseAction(`order/analysis/${recentDays}`, {}, 'GET');
};
