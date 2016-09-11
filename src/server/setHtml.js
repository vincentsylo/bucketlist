import { match } from 'react-router';
import getRoutes from '../routes';
import configureStore from './configureStore';
import getHtml from './getHtml';

module.exports = function setHtml(req, res) {
  match({
    routes: getRoutes(configureStore(), req),
    location: req.url,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
    } else if (renderProps) {
      getHtml(req, res, renderProps);
    } else {
      res.status(404);
    }
  });
};
