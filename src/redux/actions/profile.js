import qs from 'qs';
import services from '../../Helpers/services';

export default {
  getProfile: (token) => ({
    type: 'GET_PROFILE',
    payload: services(token).get(`users/profile`),
  }),
  updateProfile: (token, data) => ({
    type: 'UPDATE_PROFILE',
    payload: services(token).patch('users/profile', data),
  }),
  updatePassword: (token, data = {}) => ({
    type: 'UPDATE_PASSWORD',
    payload: services(token).post('users/profile/password', qs.stringify(data)),
  }),
  deleteAvatar: (token) => ({
    type: 'DELETE_AVATAR',
    payload: services(token).delete('/users/profile/avatar'),
  }),
  clearDelAvaMessage: () => ({
    type: 'CLEAR_DELETE_AVATAR_PROFILE_MESSAGE',
  }),
  clearUpdateMessage: () => ({
    type: 'CLEAR_UPDATE_PROFILE_MESSAGE',
  }),
  clearPasswordMessage: () => ({
    type: 'CLEAR_UPDATE_PASSWORD_MESSAGE',
  }),
};
