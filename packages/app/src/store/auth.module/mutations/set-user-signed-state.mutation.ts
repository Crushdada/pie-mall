import { AuthModuleState } from '@types/vuex/modules/auth/module-state.interface';

// export ActionName & MutationFunc
export const USER_SIGNED = 'setUserSigned';
export const USER_SIGNED_OUT = 'setUserSignedOut';

/**
 * 更新身份认证ticket
 * @param {AuthModuleState} state 模块的局部状态对象
 */
export function setUserSigned(state: AuthModuleState) {
  state.signed = true;
}
/**
 * 更新用户登出状态
 * @param {AuthModuleState} state 模块的局部状态对象
 */
export function setUserSignedOut(state: AuthModuleState) {
  state.signed = false;
}
