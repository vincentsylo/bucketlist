import {
  MAP_ADDLEG,
  MAP_SELECTCOUNTRY,
  MAP_SELECTSTATE,
  MAP_RESET,
} from '../actions/mapActions';

const initialState = {
  selectedJourney: null,
  selectedCountry: null,
  selectedState: null,
  selectionMode: '',
};

export default function map(state = initialState, action) {
  switch (action.type) {
    case MAP_ADDLEG:
      return {
        ...state,
        selectedJourney: action.journey,
        selectionMode: 'country',
      };
    case MAP_SELECTCOUNTRY:
      return {
        ...state,
        selectedCountry: action.country,
        selectionMode: 'state',
      };
    case MAP_SELECTSTATE:
      return {
        ...state,
        selectedState: action.state,
        selectionMode: '',
      };
    case MAP_RESET:
      return initialState;
    default:
      return state;
  }
}
