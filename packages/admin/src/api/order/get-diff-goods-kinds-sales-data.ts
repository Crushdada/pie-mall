import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { GoodsCategory } from '../../../../types/goods/goods-categories.enum';
export const getDiffGoodsKindsSalesData = (): Promise<
  ResponseBody<Array<{ category: GoodsCategory; consumption: string | number }>>
> => {
  return ApiService.baseAction(
    `order/diff-kinds-goods-sales/analysis`,
    {},
    'GET',
  );
};
