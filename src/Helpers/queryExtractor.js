export default (pageInfo = {}) => {
  let arrQuery = pageInfo.nextLink ? pageInfo.nextLink : '';
  let stringQuery = '';
  if (arrQuery) {
    arrQuery = arrQuery.split('');
    const queryStart = arrQuery.findIndex((element) => element.includes('?'));
    stringQuery = arrQuery.slice(queryStart + 1).join('');
  }
  return stringQuery;
};
