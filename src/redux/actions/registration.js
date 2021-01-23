import qs from 'qs';
import services from '../../Helpers/services';

export default {
  getAllRegistrator: (token, query = {}) => ({
    type: 'GET_ALL_REGISTRATOR',
    payload: services(token).get(`registrations?${qs.stringify(query)}`),
  }),
  getDetailRegistrator: (token, id) => ({
    type: 'GET_REGISTRATOR_DETAILS',
    payload: services(token).get(`registrations/${id}`),
  }),
  deleteRegistrator: (token, id) => ({
    type: 'DELETE_REGISTRATOR',
    payload: services(token).delete(`registrations/${id}`),
  }),
  clearDeleteMessage: () => ({
    type: 'CLEAR_DELETE_REGISTRATOR_MESSAGE',
  }),
  clearGetMessage: () => ({
    type: 'CLEAR_GET_REGISTRATOR_MESSAGE',
  }),
};
