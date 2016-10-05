import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import _ from 'lodash';
import Root from '../containers/Root';

function renderComponentWithRoot(Component, componentProps, store) {
  const componentHtml = renderToStaticMarkup(
    <Provider store={store}>
      <Component {...componentProps} />
    </Provider>
  );

  const head = Helmet.rewind();
  const initialState = store.getState();

  return `<!doctype html>\n${renderToStaticMarkup(<Root content={componentHtml} initialState={initialState} head={head} />)}`;
}

export default function getHtml(req, res, renderProps, store) {
  const status = renderProps.routes[renderProps.routes.length - 1].path === '*' ? 404 : 200;
  const readyOnAllActions = _(renderProps.components)
    .filter('readyOnActions')
    .map(component => component.readyOnActions(store.dispatch, renderProps));

  Promise
    .all(readyOnAllActions)
    .then(() => res.status(status).send(renderComponentWithRoot(RouterContext, renderProps, store)));
}
