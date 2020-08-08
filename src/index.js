import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import { getUser } from './api/auth';
import store from './store/config';
import * as actionTypes from './store/actionTypes';

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
  jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
    if (err) {
      token = null;
      cookie.remove('token');
      return;
    }
  });
}

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  getUser()
    .then(({ user }) => {
      store.dispatch({ type: actionTypes.SET_LOGIN, payload: { user } });
    })
    .then(() => mountApp());
} else mountApp();
