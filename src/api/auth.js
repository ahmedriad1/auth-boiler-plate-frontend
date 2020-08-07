import request from './request';

export const getUser = () => request.get('/api/v1/user');

export const login = body => request.get('/api/v1/login', body);

export const register = body => request.get('/api/v1/register', body);
