import {
  AUTH_INVALID,
  AUTH_FETCHING,
  AUTH_FETCHED,
  AUTH_FETCH_FAILED,
} from '../actions/auth';

export default function auth(state = {
  readyState: AUTH_INVALID,
  auth: null,
}, action) {
  switch (action.type) {
    case AUTH_FETCHING:
      return {
        ...state,
        readyState: AUTH_FETCHING,
      };
    case AUTH_FETCH_FAILED:
      return {
        ...state,
        readyState: AUTH_FETCH_FAILED,
        error: action.error,
      };
    case AUTH_FETCHED:
      return {
        ...state,
        readyState: AUTH_FETCHED,
        auth: action.result,
      };
    default:
      return state;
  }
}