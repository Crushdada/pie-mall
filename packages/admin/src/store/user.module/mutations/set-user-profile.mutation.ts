import { UserModuleState } from '@types/vuex/modules/user/module-state.interface';
import { UserProfileInterface } from '../../../../../types/user/user-profile.interface';
// export ActionName & MutationFunc
export const SET_USER_PROFILE = 'setUserProfile';

/**
 * 更新用户信息
 * @export mutationFunc
 * @param {UserModuleState} state 模块的局部状态对象
 * @param {UserProfileInterface} userProfile
 */
export function setUserProfile(
  state: UserModuleState,
  userProfile: UserProfileInterface,
) {
  state.userProfile = userProfile;
}
