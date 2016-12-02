import { api } from '../../utils';
import { plannerActions } from '../actions';

export const JOURNEY_INVALID = 'JOURNEY_INVALID';
export const JOURNEY_FETCHING = 'JOURNEY_FETCHING';
export const JOURNEY_LIST_FETCHED = 'JOURNEY_LIST_FETCHED';
export const JOURNEY_SINGLE_FETCHED = 'JOURNEY_SINGLE_FETCHED';
export const JOURNEY_FETCH_FAILED = 'JOURNEY_FETCH_FAILED';

export function fetchJourneys() {
  return async (dispatch) => {
    dispatch({ type: JOURNEY_FETCHING });

    const response = await api.get('/journey/list')
      .catch((error) => {
        dispatch({ type: JOURNEY_FETCH_FAILED, error, result: null });
      });

    if (response) {
      dispatch({ type: JOURNEY_LIST_FETCHED, result: response });
    }
  };
}

export function fetchJourney(id) {
  return async (dispatch) => {
    dispatch({ type: JOURNEY_FETCHING });
    dispatch(plannerActions.selectLeg(null, ''));

    const response = await api.get(`/journey/${id}`)
      .catch((error) => {
        dispatch({ type: JOURNEY_FETCH_FAILED, error, result: null });
      });

    if (response) {
      dispatch({ type: JOURNEY_SINGLE_FETCHED, result: response });
    }
  };
}
