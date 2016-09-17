import React from 'react';
import { IndexRoute, Route } from 'react-router';
import ReactCookie from 'react-cookie';
import { AUTH_FETCHED, fetchAuth } from './store/actions/auth';
import { isClient } from './utils';
import App from './containers/App/App';
import Home from './containers/Home/Home';
import Contact from './containers/Contact/Contact';
import Map from './containers/Map/Map';
import Login from './containers/Login/Login';
import Join from './containers/Join/Join';
import Journeys from './containers/Journeys/Journeys';

export default (store, req, res) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth } = store.getState();
      if (!auth.user) {
        replace('/login');
      }
      cb();
    }

    if (!isClient()) {
      ReactCookie.setRawCookie(req.headers.cookie);
    }

    if (store.getState().auth.readyState !== AUTH_FETCHED) {
      store.dispatch(fetchAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />

      <Route path="contact" component={Contact} />
      <Route path="map" component={Map} />
      <Route path="login" component={Login} />
      <Route path="join" component={Join} />

      <Route onEnter={requireLogin}>
        <Route path="journeys" component={Journeys} />
      </Route>

      <Route path="*" status={404} />
    </Route>
  );
};
