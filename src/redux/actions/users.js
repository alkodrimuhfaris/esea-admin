import qs from 'qs';
import services from '../../Helpers/services';

export default {
  getAllUsers: (token) => ({
    type: 'GET_ALL_USERS',
    payload: services(token).get(`users/admin`),
  }),
  getUserDetails: (token, id) => ({
    type: 'GET_USER_DETAIL',
    payload: services(token).get(`users/admin/${id}`),
  }),
  updateUser: (token, id, data = {}) => ({
    type: 'UPDATE_USER',
    payload: services(token).patch(`users/admin/${id}`, data),
  }),
  deleteUser: (token, id) => ({
    type: 'DELETE_USER',
    payload: services(token).delete(`users/admin/${id}`),
  }),
  createUser: (token, data = {}) => ({
    type: 'CREATE_USER',
    payload: services(token).post('users/admin', qs.stringify(data)),
  }),
  clearUpdateMessage: () => ({
    type: 'CLEAR_UPDATE_USERS_MESSAGE',
  }),
  clearCreateMessage: () => ({
    type: 'CLEAR_CREATE_USERS_MESSAGE',
  }),
  clearDeleteMessage: () => ({
    type: 'CLEAR_DELETE_USERS_MESSAGE',
  }),
};
