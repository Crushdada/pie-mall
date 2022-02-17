import {
  SET_AUTH_TICKET,
  setAuthTicket,
} from './mutations/set-auth-ticket.mutation';

export default {
  namespaced: false,
  state: {
    ticket: '',
  },
  mutations: {
    [SET_AUTH_TICKET]: setAuthTicket,
  },
  actions: {},
};
