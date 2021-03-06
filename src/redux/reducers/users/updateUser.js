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
    case 'UPDATE_USER_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Updating user profile...',
      };
    }
    case 'UPDATE_USER_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'UPDATE_USER_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success update profile',
      };
    }
    case 'CLEAR_UPDATE_USERS_MESSAGE': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
