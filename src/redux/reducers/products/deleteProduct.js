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
    case 'DELETE_PRODUCT_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Deleting product...',
      };
    }
    case 'DELETE_PRODUCT_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'DELETE_PRODUCT_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success delete product',
      };
    }
    case 'CLEAR_DELETE_MESSAGE': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
