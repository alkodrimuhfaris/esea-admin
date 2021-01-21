import qs from 'qs';
import services from '../../Helpers/services';

export default {
  createUser: (data) => ({
    type: 'AUTH_USER_SIGNUP',
    payload: services().post(`auth/signup`, qs.stringify(data)),
  }),
  clearState: () => ({
    type: 'CLEAR_STATE',
  }),
};
