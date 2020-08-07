import { createStore } from 'redux';
import AllReducers from './reducers';

const initialStates = {
  auth: {
    loggedIn: false,
    user: {},
  },
};

const store = createStore(AllReducers, initialStates);
export default store;
