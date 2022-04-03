import { GoodsModuleState } from '@types/vuex/modules/goods/module-state.interface';
import { GoodsInterface } from '../../../../../types/goods/goods.interface';
// export ActionName & MutationFunc
export const SET_GOODS_DATASET = 'setGoodsDataset';

/**
 * 更新商品数据集
 * @export mutationFunc
 * @param {GoodsModuleState} state 模块的局部状态对象
 * @param {Array<Partial<GoodsInterface>>} goodsDataset
 */
export function setGoodsDataset(
  state: GoodsModuleState,
  goodsDataset: Array<Partial<GoodsInterface>>,
) {
  state.goodsDataset = goodsDataset;
}
