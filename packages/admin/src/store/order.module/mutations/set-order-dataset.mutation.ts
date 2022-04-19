import { OrderModuleState } from '@types/vuex/modules/order/module-state.interface';
import { OrderInterface } from '../../../../../types/order/order.interface';
// export ActionName & MutationFunc
export const SET_ORDER_DATASET = 'setOrderDataset';

/**
 * 更新订单数据集
 * @export mutationFunc
 * @param {OrderModuleState} state 模块的局部状态对象
 * @param {Array<Partial<OrderInterface>>} orderDataset
 */
export function setOrderDataset(
  state: OrderModuleState,
  orderDataset: Array<Partial<OrderInterface>>,
) {
  state.orderDataset = orderDataset;
}
