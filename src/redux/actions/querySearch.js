export default {
  querySearch: (query = {}) => ({
    type: 'ADD_QUERY',
    payload: query,
  }),
};
