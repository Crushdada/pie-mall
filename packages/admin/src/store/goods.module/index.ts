// mutations
import {
  SET_GOODS_DATASET,
  setGoodsDataset,
} from './mutations/set-goods-dataset.mutation';

export default {
  namespaced: false,
  state: {
    goodsDataset: [],
  },
  mutations: {
    [SET_GOODS_DATASET]: setGoodsDataset,
  },
  actions: {},
};
