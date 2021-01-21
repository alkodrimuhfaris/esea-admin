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
    case 'GET_USER_DETAIL_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Getting profile details...',
      };
    }
    case 'GET_USER_DETAIL_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'GET_USER_DETAIL_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success get data',
        data: action.payload.data.result,
      };
    }
  }
};
