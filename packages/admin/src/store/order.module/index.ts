// mutations
import {
  SET_ORDER_DATASET,
  setOrderDataset,
} from './mutations/set-order-dataset.mutation';

export default {
  namespaced: false,
  state: {
    goodsDataset: [],
  },
  mutations: {
    [SET_ORDER_DATASET]: setOrderDataset,
  },
  actions: {},
};
