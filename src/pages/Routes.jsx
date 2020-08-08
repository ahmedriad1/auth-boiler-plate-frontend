import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import { GuestRoute, AuthRoute } from '../components';

// Pages
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';

const Routes = () => (
  <Switch>
    <Route path='/' exact>
      <Home />
    </Route>
    <GuestRoute path='/login'>
      <Login />
    </GuestRoute>
    <GuestRoute path='/register'>
      <Register />
    </GuestRoute>
    <AuthRoute path='/profile'>
      <Profile />
    </AuthRoute>
  </Switch>
);

export default Routes;
