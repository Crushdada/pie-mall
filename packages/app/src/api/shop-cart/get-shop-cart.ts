import { ApiService } from '@/api';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { ShopCartInterface } from '../../../../types/shop-cart/shop-cart.interface';

/**
 * 获取当前用户的购物车数据
 * @returns ShopCartInterface
 */
export const getShopCart = (): Promise<ResponseBody<ShopCartInterface>> => {
  return ApiService.baseAction('shop-cart/atom', {}, 'GET');
};
