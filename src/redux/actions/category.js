import qs from 'qs';
import services from '../../Helpers/services';

export default {
  getAllCategories: (query = {page: 1, limit: '-'}) => ({
    type: 'GET_ALL_CATEGORIES',
    payload: services().get(`categories?${qs.stringify(query)}`),
  }),
};
