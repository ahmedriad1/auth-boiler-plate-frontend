import Routes from './pages/Routes';
import useAuthStore from './stores/useAuthStore';
import { useEffect } from 'react';

import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import { getUser } from './api/auth';
import { useState } from 'react';
import { setToken } from './helpers/auth';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const login = useAuthStore(state => state.login);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let token = cookie.get('token');

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
      setToken(token);
      getUser().then(({ user }) => {
        login(user, token);
        setIsLoading(false);
      });
    } else setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <div className='app relative'>
      <Toaster position='top-right' reverseOrder={false} />
      <Routes />
    </div>
  );
};

export default App;
