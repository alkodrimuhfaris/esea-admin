import qs from 'qs';
import services from '../../Helpers/services';

export default {
  login: (data) => ({
    type: 'AUTH_USER_LOGIN',
    payload: services().post(`auth/login`, qs.stringify(data)),
  }),
  logout: () => ({
    type: 'AUTH_USER_LOGOUT',
  }),
  setToken: (payload) => ({
    type: 'SET_TOKEN',
    payload,
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
