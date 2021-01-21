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
    case 'DELETE_USER_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Deleting user data...',
      };
    }
    case 'DELETE_USER_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'DELETE_USER_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success delete user data',
      };
    }
    case 'CLEAR_DELETE_USERS_MESSAGE': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
