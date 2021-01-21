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
    case 'UPDATE_PROFILE_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Updating your profile...',
      };
    }
    case 'UPDATE_PROFILE_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PROFILE_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success update profile',
      };
    }
    case 'CLEAR_UPDATE_PROFILE_MESSAGE': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
