const initialState = {
  success: false,
  error: false,
  pending: false,
  message: '',
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_PRODUCT_DETAILS_PENDING': {
      return {
        success: false,
        error: false,
        pending: true,
        message: 'Getting product details ...',
      };
    }
    case 'GET_PRODUCT_DETAILS_REJECTED': {
      return {
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'GET_PRODUCT_DETAILS_FULFILLED': {
      return {
        success: true,
        error: false,
        pending: false,
        message: 'Success get data',
        data: action.payload.data.results,
      };
    }
  }
};