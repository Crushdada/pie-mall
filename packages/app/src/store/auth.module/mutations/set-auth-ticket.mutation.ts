import { AuthModuleState } from '@types/vuex/modules/auth/module-state.interface';

// export ActionName & MutationFunc
export const SET_AUTH_TICKET = 'setAuthTicket';

/**
 * 更新身份认证ticket
 * @param {AuthModuleState} state 模块的局部状态对象
 * @param {string} ticket
 */
export function setAuthTicket(state: AuthModuleState, ticket: string) {
  state.ticket = ticket;
}
