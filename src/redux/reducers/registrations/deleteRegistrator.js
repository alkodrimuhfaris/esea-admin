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
    case 'DELETE_REGISTRATOR_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Deleting registrator data...',
      };
    }
    case 'DELETE_REGISTRATOR_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'DELETE_REGISTRATOR_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success delete registrator data',
      };
    }
    case 'CLEAR_DELETE_REGISTRATOR_MESSAGE': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
