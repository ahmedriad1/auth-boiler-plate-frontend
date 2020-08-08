import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import { GuestRoute } from '../components';

// Pages
import Login from './Login';
import Register from './Register';
import Home from './Home';

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
  </Switch>
);

export default Routes;
