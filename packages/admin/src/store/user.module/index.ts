// mutations
import {
  SET_USER_PROFILE,
  setUserProfile,
} from './mutations/set-user-profile.mutation';

// constants
import { USER_PROFILE } from './constants/user-profile.constant';

export default {
  namespaced: false,
  state: {
    userProfile: USER_PROFILE,
  },
  mutations: {
    [SET_USER_PROFILE]: setUserProfile,
  },
  actions: {},
};
