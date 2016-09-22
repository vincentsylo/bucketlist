import { api } from '../../utils';

export const AUTH_INVALID = 'AUTH_INVALID';
export const AUTH_FETCHING = 'AUTH_FETCHING';
export const AUTH_FETCHED = 'AUTH_FETCHED';
export const AUTH_FETCH_FAILED = 'AUTH_FETCH_FAILED';

export function fetchAuth() {
  return async (dispatch) => {
    dispatch({ type: AUTH_FETCHING });

    const response = await api.post('/auth/validate')
      .catch((error) => {
        dispatch({ type: AUTH_FETCH_FAILED, error });
      });

    if (response) {
      dispatch({type: AUTH_FETCHED, result: response});
    }
  };
}

export function checkAuthStatus() {
  return (dispatch, getState) => {
    if (getState().auth.user) {
      dispatch(fetchAuth());
    }
  }
}