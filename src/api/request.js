import axios from 'axios';

export default {
  get: (...options) => axios.get(...options).then(res => res.data),
  post: (...options) => axios.post(...options).then(res => res.data),
  put: (...options) => axios.put(...options).then(res => res.data),
  patch: (...options) => axios.patch(...options).then(res => res.data),
  delete: (...options) => axios.delete(...options).then(res => res.data),
};
