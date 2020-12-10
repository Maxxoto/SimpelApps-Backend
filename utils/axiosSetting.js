const keys = require('../config/keys');

module.exports = () => {
  const token = 'token';

  const option = {};
  option.baseURL = keys.baseURL;
  option.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
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
