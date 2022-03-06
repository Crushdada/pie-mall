// mutations
import {
  SET_USER_PROFILE,
  setUserProfile,
} from './mutations/set-user-profile.mutation';
import {
  UPDATE_USER_PROFILE,
  updateUserProfile,
} from './mutations/update-user-profile.mutation';

// constants
import { USER_PROFILE } from './constants/user-profile.constant';

export default {
  namespaced: false,
  state: {
    userProfile: USER_PROFILE,
  },
  mutations: {
    [SET_USER_PROFILE]: setUserProfile,
    [UPDATE_USER_PROFILE]: updateUserProfile,
  },
  actions: {},
};
