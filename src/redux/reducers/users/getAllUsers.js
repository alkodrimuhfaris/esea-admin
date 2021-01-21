const initialState = {
  success: false,
  error: false,
  pending: false,
  message: '',
  data: [],
  pageInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_ALL_USERS_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Getting all users...',
      };
    }
    case 'GET_ALL_USERS_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'GET_ALL_USERS_FULFILLED': {
      return {
        ...state,
        success: true,
        error: false,
        pending: false,
        message: 'Success get data',
        data: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo,
      };
    }
  }
};
