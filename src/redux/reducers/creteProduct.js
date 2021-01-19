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
    case 'CREATE_PRODUCT_PENDING': {
      return {
        success: false,
        error: false,
        pending: true,
        message: 'Creting new produt ...',
      };
    }
    case 'CREATE_PRODUCT_REJECTED': {
      return {
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'CREATE_PRODUCT_FULFILLED': {
      return {
        success: true,
        error: false,
        pending: false,
        message: 'Success create new product',
      };
    }
  }
};
