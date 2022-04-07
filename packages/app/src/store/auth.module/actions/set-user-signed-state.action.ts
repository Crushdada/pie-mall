import { AuthModuleState } from '@types/vuex/modules/auth/module-state.interface';
import { VuexRootState } from '@types/vuex/root-state.interface';
import { ActionContext } from 'vuex';
import { USER_SIGNED_OUT } from '../mutations/set-user-signed-state.mutation';
import { DELETE_AUTH_TICKET } from '../mutations/delete-auth-ticket.mutation';

export const SIGNED_OUT = "userSignedOut";
/**
 * 设置用户信息
 * @export actionFunc
 * @param {ActionContext<AuthModuleState,VuexRootState>} context 模块的局部状态对象
 */
export function userSignedOut({
  state,
  commit,
  dispatch,
}: ActionContext<AuthModuleState, VuexRootState>): void {
  commit(DELETE_AUTH_TICKET);
  commit(USER_SIGNED_OUT);
}
