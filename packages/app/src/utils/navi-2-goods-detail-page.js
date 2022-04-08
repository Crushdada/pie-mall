import router from '@/router/index.ts';

/**
 * 跳转到商品详情页的工具函数
 * @param { string } goodsID
 * @turn2 GoodsPage
 */
export const navi2GoodsDetailPage = goodsID => {
  router.push({ path: `/goods/${goodsID}` });
};
