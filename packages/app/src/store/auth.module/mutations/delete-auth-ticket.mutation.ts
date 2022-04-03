import { AuthModuleState } from '@types/vuex/modules/auth/module-state.interface';

export const DELETE_AUTH_TICKET = 'deleteAuthTicket';

/**
 * 删除store持久化存储的ticket
 * @param {AuthModuleState} state 模块的局部状态对象
 */
export function deleteAuthTicket(state: AuthModuleState) {
  state.ticket = '';
}
