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
    case 'GET_REGISTRATOR_DETAILS_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Getting product details ...',
      };
    }
    case 'GET_REGISTRATOR_DETAILS_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'GET_REGISTRATOR_DETAILS_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success get data',
        data: action.payload.data.result,
      };
    }
    case 'CLEAR_GET_REGISTRATOR_MESSAGE': {
      return {
        ...state,
        success: false,
        error: false,
        pending: false,
        message: '',
      };
    }
  }
};
