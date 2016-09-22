import {
  AUTH_INVALID,
  AUTH_FETCHING,
  AUTH_FETCHED,
  AUTH_FETCH_FAILED,
} from '../actions/authActions';

export default function auth(state = {
  readyState: AUTH_INVALID,
  error: null,
  user: null,
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
        user: null,
      };
    case AUTH_FETCHED:
      return {
        ...state,
        readyState: AUTH_FETCHED,
        user: action.result,
      };
    default:
      return state;
  }
}
