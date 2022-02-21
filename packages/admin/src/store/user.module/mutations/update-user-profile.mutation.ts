import { UserModuleState } from '@types/vuex/modules/user/module-state.interface';
import { UserProfileInterface } from '../../../../../types/user/user-profile.interface';
import { set } from 'lodash';

// export ActionName & MutationFunc
export const UPDATE_USER_PROFILE = 'updateUserProfile';

/**
 * 更新用户信息
 * @export mutationFunc
 * @param {UserModuleState} state 模块的局部状态对象
 * @param {keyof Omit<UserProfileInterface, 'id'>} userProfileField 用户信息字段
 * @param {any} val 字段值
 */
export function updateUserProfile(
  state: UserModuleState,
  userProfileField: keyof Omit<UserProfileInterface, 'id'>,
  val: any,
) {
  set(state.userProfile, userProfileField, val);
}
