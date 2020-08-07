import { combineReducers } from 'redux';
import AuthReducer from './auth';

const AllReducers = combineReducers({ auth: AuthReducer });

export default AllReducers;
