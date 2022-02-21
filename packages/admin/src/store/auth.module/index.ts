import {
  SET_AUTH_TICKET,
  setAuthTicket,
} from './mutations/set-auth-ticket.mutation';

import {
  DELETE_AUTH_TICKET,
  deleteAuthTicket,
} from './mutations/delete-auth-ticket.mutation';

export default {
  namespaced: false,
  state: {
    ticket: '',
  },
  mutations: {
    [SET_AUTH_TICKET]: setAuthTicket,
    [DELETE_AUTH_TICKET]: deleteAuthTicket,
  },
  actions: {},
};
