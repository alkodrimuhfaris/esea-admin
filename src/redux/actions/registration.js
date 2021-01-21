import qs from 'qs';
import services from '../../Helpers/services';

export default {
  getAllRegistrator: (query = {}) => ({
    type: 'GET_ALL_REGISTRATOR',
    payload: services().get(`registrations?${qs.stringify({query})}`),
  }),
  deleteRegistrator: (id) => ({
    type: 'DELETE_REGISTRATOR',
    payload: services().delete(`registrations/${id}`),
  }),
  clearDeleteMessage: () => ({
    type: 'CLEAR_DELETE_REGISTRATOR_MESSAGE',
  }),
};
