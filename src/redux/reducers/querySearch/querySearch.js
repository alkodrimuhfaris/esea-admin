const initialState = {
  query: {
    page: 1,
    limit: 5,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'ADD_QUERY': {
      return {
        query: action.payload,
      };
    }
  }
};
