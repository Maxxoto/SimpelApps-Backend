const keys = require('../config/keys');

module.exports = (token) => {
  const option = {};
  option.baseURL = keys.baseURL;
  option.headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  // TODO : TOKEN
  // if (requireAuth) {
  //   option.headers = {
  //      Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //   };
  // }

  // const instance = axios.create(option);

  return option;
};
