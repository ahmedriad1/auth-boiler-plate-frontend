import React from 'react';
import Transition from '../components/Transition';

const AlertContext = React.createContext();

const AlertContextProvider = props => {
  const [info, setInfo] = React.useState({
    open: false,
  });

  const showError = (msg, time = 3500) => {
    setInfo({ open: true, type: 'error', msg, time });
    setTimeout(() => {
      setInfo({ open: false, type: 'error', msg, time });
    }, time);
  };

  const showSuccess = (msg, time = 3500) => {
    setInfo({ open: true, type: 'success', msg, time });
    setTimeout(() => {
      setInfo({ open: false, type: 'success', msg, time });
    }, time);
  };

  return (
    <AlertContext.Provider value={{ showError, showSuccess }}>
      <Transition
        show={info.open}
        enter='transition ease-out duration-200 transform'
        enterFrom='opacity-0 -translate-y-3'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-75 transform'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 -translate-y-3'
      >
        <div
          className='fixed w-full flex justtify-center items-center py-2 px-4'
          style={{ zIndex: 999999999999 }}
        >
          <div
            className={`relative ml-auto w-1/3 rounded shadow-md p-3 px-5 bg-white alert alert--${info.type} overflow-hidden`}
          >
            <div className='flex items-center'>
              <svg
                className={`w-5 h-5 mr-4 stroke-current text-${
                  info.type === 'success' ? 'green' : 'red'
                }-500`}
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {info.type === 'success' ? (
                  <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                ) : (
                  <path d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                )}
              </svg>

              {info.msg}
            </div>
            <div
              className={`progress absolute w-full h-1 bg-${
                info.type === 'success' ? 'green' : 'red'
              }-500 bottom-0 left-0`}
              style={{ animationDuration: info.time + 75 + 'ms' }}
            ></div>
          </div>
        </div>
      </Transition>
      {props.children}
    </AlertContext.Provider>
  );
};

const useAlertContext = () => React.useContext(AlertContext);

export { AlertContextProvider, useAlertContext };
