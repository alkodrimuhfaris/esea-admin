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
    case 'DELETE_AVATAR_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Deleting your avatar...',
      };
    }
    case 'DELETE_AVATAR_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'DELETE_AVATAR_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success delete avatar',
      };
    }
    case 'CLEAR_DELETE_AVATAR_PROFILE_MESSAGE': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
