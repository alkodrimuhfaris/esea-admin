import qs from 'qs';
import services from '../../Helpers/services';

export default {
  getAllProducts: (query = {}) => ({
    type: 'GET_ALL_PRODUCTS',
    payload: services().get(`products?${qs.stringify(query)}`),
  }),
  getProductDetails: (id) => ({
    type: 'GET_PRODUCT_DETAILS',
    payload: services().get(`products/${id}`),
  }),
  createProduct: (token, data = {}) => ({
    type: 'CREATE_PRODUCT',
    payload: services(token).post('products/', qs.stringify(data)),
  }),
  updateProduct: (token, id, data = {}) => ({
    type: 'UPDATE_PRODUCT',
    payload: services(token).patch(`products/${id}`, qs.stringify(data)),
  }),
  deleteProduct: (token, id) => ({
    type: 'DELETE_PRODUCT_DETAILS',
    payload: services(token).delete(`products/${id}`),
  }),
  clearCreateMessage: () => ({
    type: 'CLEAR_CREATE_MESSAGE',
  }),
  clearUpdateMessage: () => ({
    type: 'CLEAR_UPDATE_MESSAGE',
  }),
  clearDeleteMessage: () => ({
    type: 'CLEAR_DELETE_MESSAGE',
  }),
};
