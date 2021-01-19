const initialState = {
  success: false,
  error: false,
  pending: false,
  message: '',
  data: [],
  pageInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_ALL_PRODUCTS_PENDING': {
      return {
        success: false,
        error: false,
        pending: true,
        message: 'Getting products ...',
      };
    }
    case 'GET_ALL_PRODUCTS_REJECTED': {
      return {
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'GET_ALL_PRODUCTS_FULFILLED': {
      return {
        success: true,
        error: false,
        pending: false,
        message: 'Success get data',
        data: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo,
      };
    }
  }
};
