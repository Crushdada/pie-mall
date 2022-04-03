import { UserProfileInterface } from '../../../../../types/user/user-profile.interface';

export interface UpdateUserProfilePayload {
  field: keyof Omit<UserProfileInterface, 'id'>;
  val: any;
}
