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
  clearProductDetails: () => ({
    type: 'CLEAR_PRODUCT_DETAILS',
  }),
  createProduct: (token, data = {}) => ({
    type: 'CREATE_PRODUCT',
    payload: services(token).post('products/', data),
  }),
  updateProduct: (token, id, data = {}) => ({
    type: 'UPDATE_PRODUCT',
    payload: services(token).patch(`products/${id}`, data),
  }),
  deleteProduct: (token, id) => ({
    type: 'DELETE_PRODUCT',
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
