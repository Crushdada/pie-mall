import {
  SET_AUTH_TICKET,
  setAuthTicket,
} from './mutations/set-auth-ticket.mutation';

import {
  DELETE_AUTH_TICKET,
  deleteAuthTicket,
} from './mutations/delete-auth-ticket.mutation';

import {
  USER_SIGNED,
  USER_SIGNED_OUT,
  setUserSigned,
  setUserSignedOut,
} from './mutations/set-user-signed-state.mutation';

import { SIGNED_OUT, userSignedOut } from './actions/set-user-signed-state.action';

export default {
  namespaced: false,
  state: {
    ticket: '',
    signed: false,
  },
  mutations: {
    [SET_AUTH_TICKET]: setAuthTicket,
    [DELETE_AUTH_TICKET]: deleteAuthTicket,
    [USER_SIGNED]: setUserSigned,
    [USER_SIGNED_OUT]: setUserSignedOut,
  },
  actions: { [SIGNED_OUT]: userSignedOut },
};
