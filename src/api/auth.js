import request from './request';

export const getUser = () => request.get('/api/v1/auth/me');

export const login = body => request.post('/api/v1/auth/login', body);

export const register = body => request.post('/api/v1/auth/register', body);
