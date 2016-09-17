import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import startStore from './store/startStore';
import getRoutes from './routes';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{getRoutes(store)}</Router>
  </Provider>,
  document.getElementById('root'),
  startStore(store)
);
