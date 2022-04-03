import { UserModuleState } from '@types/vuex/modules/user/module-state.interface';
// import { UserProfileInterface } from '../../../../../types/user/user-profile.interface';
import { set } from 'lodash';
import { UpdateUserProfilePayload } from '../interfaces/update-userProfile-payload.interface';

// export ActionName & MutationFunc
export const UPDATE_USER_PROFILE = 'updateUserProfile';

/**
 * 更新用户信息
 * @export mutationFunc
 * @param { UserModuleState } state 模块的局部状态对象
 * @param { UpdateUserProfilePayload } payload 用户信息字段及值
 */
export function updateUserProfile(
  state: UserModuleState,
  payload: UpdateUserProfilePayload,
) {
  const { field, val } = payload;
  set(state.userProfile, field, val);
}
