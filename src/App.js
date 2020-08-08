import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/config';
import Routes from './pages/Routes';
import { AlertContextProvider } from './contexts/AlertContext';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='app'>
          <AlertContextProvider>
            <Routes />
          </AlertContextProvider>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
