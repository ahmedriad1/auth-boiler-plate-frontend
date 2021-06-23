import { Route, Redirect } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const GuestRoute = ({ children, ...props }) => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <Route {...props}>
      {!isLoggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )}
    </Route>
  );
};

export default GuestRoute;
