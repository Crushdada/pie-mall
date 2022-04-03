import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';

export const getGoodsCategories = async (): Promise<
  ResponseBody<string[]>
> => {
  return ApiService.baseAction(`goods/categories`, {}, 'GET');
};
