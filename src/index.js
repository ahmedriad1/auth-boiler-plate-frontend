import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
let token = cookie.get('token');

const mountApp = () => {
  return ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

if (token) {
  const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
}
