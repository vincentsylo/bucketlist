import { combineReducers } from 'redux';
import auth from './auth';
import journey from './journey';
import map from './map';

export default combineReducers({
  auth,
  journey,
  map,
});
