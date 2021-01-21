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
    case 'UPDATE_PASSWORD_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Updating your password...',
      };
    }
    case 'UPDATE_PASSWORD_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PASSWORD_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success update password',
      };
    }
    case 'CLEAR_UPDATE_PASSWORD_MESSAGE': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
