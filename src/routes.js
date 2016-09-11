import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App/App';
import Home from './containers/Home/Home';
import Contact from './containers/Contact/Contact';
import Map from './containers/Map/Map';
import Login from './containers/Login/Login';
import Join from './containers/Join/Join';

export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="contact" component={Contact} />
    <Route path="map" component={Map} />
    <Route path="login" component={Login} />
    <Route path="join" component={Join} />
    <Route path="*" status={404} />
  </Route>
);
