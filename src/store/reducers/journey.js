import {
  JOURNEY_INVALID,
  JOURNEY_FETCHING,
  JOURNEY_LIST_FETCHED,
  JOURNEY_SINGLE_FETCHED,
  JOURNEY_FETCH_FAILED,
} from '../actions/journeyActions';

export default function journey(state = {
  readyState: JOURNEY_INVALID,
  error: null,
  journeys: [],
  selectedJourney: null,
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
    case JOURNEY_LIST_FETCHED:
      return {
        ...state,
        readyState: JOURNEY_LIST_FETCHED,
        journeys: action.result,
      };
    case JOURNEY_SINGLE_FETCHED:
      return {
        ...state,
        readyState: JOURNEY_SINGLE_FETCHED,
        selectedJourney: action.result,
      };
    default:
      return state;
  }
}
