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
    case 'CREATE_USER_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Creating new user...',
      };
    }
    case 'CREATE_USER_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'CREATE_USER_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success creating new user',
      };
    }
    case 'CLEAR_CREATE_USERS_MESSAGE': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
