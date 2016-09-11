import React from 'react';
import { Route } from 'react-router';
import App from './containers/App/App';
import Home from './containers/Home/Home';

export default () => {

  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="*" status={404} />
    </Route>
  );
};