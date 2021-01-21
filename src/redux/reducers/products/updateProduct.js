const initialState = {
  success: false,
  error: false,
  pending: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'UPDATE_PRODUCT_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Updating product...',
      };
    }
    case 'UPDATE_PRODUCT_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PRODUCT_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success update product',
      };
    }
    case 'CLEAR_UPDATE_MESSAGE': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
