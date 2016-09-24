import { api } from '../../utils';

export const JOURNEY_INVALID = 'JOURNEY_INVALID';
export const JOURNEY_FETCHING = 'JOURNEY_FETCHING';
export const JOURNEY_FETCHED = 'JOURNEY_FETCHED';
export const JOURNEY_FETCH_FAILED = 'JOURNEY_FETCH_FAILED';

export function fetchJourneys() {
  return async (dispatch) => {
    dispatch({ type: JOURNEY_FETCHING });

    const response = await api.get('/journey/list')
      .catch((error) => {
        dispatch({ type: JOURNEY_FETCH_FAILED, error, result: null });
      });

    if (response) {
      dispatch({type: JOURNEY_FETCHED, result: response});
    }
  };
}
