import { combineReducers } from 'redux';
import auth from './auth';
import journey from './journey';

export default combineReducers({
  auth,
  journey,
});
