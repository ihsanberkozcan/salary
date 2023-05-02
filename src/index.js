import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux';
import store from './stores';

const sagaMiddleware = createSagaMiddleware()



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

