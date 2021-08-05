import cookie from 'js-cookie';
import axios from 'axios';

const setToken = token => {
  cookie.set('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export { setToken };
