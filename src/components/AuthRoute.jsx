import { Route, Redirect } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const AuthRoute = ({ children, ...props }) => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <Route {...props}>
      {isLoggedIn ? (
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
