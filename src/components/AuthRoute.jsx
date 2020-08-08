import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

const AuthRoute = ({ children, ...props }) => {
  const loggedIn = useSelector(state => state.auth.loggedIn);

  return (
    <Route {...props}>
      {loggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )}
    </Route>
  );
};

export default AuthRoute;
