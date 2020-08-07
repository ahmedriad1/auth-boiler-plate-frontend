import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/config';
import Routes from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='app'>
          <Routes />
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
