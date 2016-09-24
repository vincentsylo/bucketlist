import {
  MAP_ADDLEG,
  MAP_SELECTCOUNTRY,
  MAP_SELECTSTATE,
} from '../actions/mapActions';

export default function map(state = {
  selectedJourney: null,
  selectedCountry: null,
  selectedState: null,
  selectionMode: '',
}, action) {
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
    default:
      return state;
  }
}
