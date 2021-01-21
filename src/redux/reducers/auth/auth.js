/* eslint-disable no-undef */
const initialState = {
  isLogin: false,
  isSuccess: false,
  isError: false,
  isLoading: false,
  alertMsg: '',
  token: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_LOGIN_PENDING': {
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        isError: false,
        isLogin: false,
        alertMsg: 'Logging in',
      };
    }
    case 'AUTH_USER_LOGIN_REJECTED': {
      return {
        ...state,
        isSuccess: false,
        isError: true,
        isLoading: false,
        isLogin: false,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'AUTH_USER_LOGIN_FULFILLED': {
      const {message, token} = action.payload.data;
      localStorage.setItem('token', token);
      return {
        ...state,
        isLogin: true,
        isSuccess: true,
        isError: false,
        alertMsg: message,
        isLoading: false,
        token,
      };
    }
    case 'AUTH_USER_LOGOUT': {
      localStorage.removeItem('token');
      return {
        ...state,
        ...initialState,
        alertMsg: 'Logout Successfull!',
      };
    }
    case 'CLEAR_LOGIN_NOTIF': {
      return {
        ...state,
        isSuccess: false,
        isError: false,
        isLoading: false,
        alertMsg: '',
      };
    }
    case 'SET_TOKEN': {
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
