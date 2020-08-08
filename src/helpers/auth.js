import cookie from 'js-cookie';
import axios from 'axios';

const emailPattern = () => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
};

const setToken = token => {
  cookie.set('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export { emailPattern, setToken };
