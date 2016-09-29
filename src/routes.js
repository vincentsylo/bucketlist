import React from 'react';
import { IndexRoute, Route } from 'react-router';
import ReactCookie from 'react-cookie';
import { authActions } from './store/actions';
import { isClient } from './utils';
import App from './containers/App/App';
import Home from './containers/Home/Home';
import Contact from './containers/Contact/Contact';
import Login from './containers/Login/Login';
import Join from './containers/Join/Join';
import Journeys from './containers/Journeys/Journeys';
import TripPlanner from './containers/TripPlanner/TripPlanner';
import TripSelector from './containers/TripSelector/TripSelector';

export default (store, req) => {
  if (!isClient()) {
    ReactCookie.setRawCookie(req.headers.cookie);
  }

  const setAuth = (nextState, replace, cb) => {
    store.dispatch(authActions.fetchAuth()).then(cb);
  };

  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth } = store.getState();
      if (!auth.user.validated) {
        replace('/login');
      }
      cb();
    }

    if (store.getState().auth.readyState !== authActions.AUTH_FETCHED) {
      store.dispatch(authActions.fetchAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" onEnter={setAuth} component={App}>
      <IndexRoute component={Home} />

      <Route path="contact" component={Contact} />
      <Route path="login" component={Login} />
      <Route path="join" component={Join} />

      <Route onEnter={requireLogin}>
        <Route path="journeys" component={Journeys} />
        <Route path="trip-planner" component={TripSelector} />
        <Route path="trip-planner/:tripId" component={TripPlanner} />
      </Route>

      <Route path="*" status={404} />
    </Route>
  );
};
