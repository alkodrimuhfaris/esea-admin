export default (string) => {
  if (typeof string === 'string') {
    string = string
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .toLowerCase();
    string = string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
};
