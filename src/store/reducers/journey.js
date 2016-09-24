import {
  JOURNEY_INVALID,
  JOURNEY_FETCHING,
  JOURNEY_FETCHED,
  JOURNEY_FETCH_FAILED,
} from '../actions/journeyActions';

export default function journey(state = {
  readyState: JOURNEY_INVALID,
  error: null,
  journeys: [],
}, action) {
  switch (action.type) {
    case JOURNEY_FETCHING:
      return {
        ...state,
        readyState: JOURNEY_FETCHING,
      };
    case JOURNEY_FETCH_FAILED:
      return {
        ...state,
        readyState: JOURNEY_FETCH_FAILED,
        error: action.error,
      };
    case JOURNEY_FETCHED:
      return {
        ...state,
        readyState: JOURNEY_FETCHED,
        journeys: action.result,
      };
    default:
      return state;
  }
}
