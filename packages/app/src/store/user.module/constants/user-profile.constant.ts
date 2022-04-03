import { UserProfileInterface } from '../../../../../types/user/user-profile.interface';
// 用于存放states的默认值 / 初始值（初始的state），当一个字段的值为对象时，可以将其放在这里，然后在index.ts引入
/**
 * userProfile的初始值
 */
export const USER_PROFILE: UserProfileInterface = {
  id: '',
  name: '',
  avatar: '',
  account: '',
  password: '',
  role: 'admin',
};
