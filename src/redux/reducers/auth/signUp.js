const initialState = {
  userIsCreated: false,
  isError: false,
  isLoading: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_SIGNUP_PENDING': {
      return {
        ...state,
        userIsCreated: false,
        isError: false,
        isLoading: true,
        alertMsg: 'Sign you up...',
      };
    }
    case 'AUTH_USER_SIGNUP_REJECTED': {
      return {
        ...state,
        isError: true,
        alertMsg: action.payload.response.data.message,
        userIsCreated: false,
        isLoading: false,
      };
    }
    case 'AUTH_USER_SIGNUP_FULFILLED': {
      return {
        userIsCreated: true,
        isError: false,
        alertMsg: 'Sign up successfull!',
        isLoading: false,
      };
    }
    case 'CLEAR_STATE': {
      return {
        ...state,
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
