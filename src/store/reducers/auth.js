import * as types from '../actionTypes';

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      };

    case types.SET_LOGOUT:
      return { ...state, loggedIn: false, user: {} };

    case types.UPDATE_USER:
      return { ...state, user: action.payload.user };

    default:
      return state;
  }
};

export default AuthReducer;
