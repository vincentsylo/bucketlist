import { api } from '../../utils';
import { journeyActions } from '../actions';

export const MAP_ADDLEG = 'MAP_ADDLEG';
export const MAP_SELECTCOUNTRY = 'MAP_SELECTCOUNTRY';
export const MAP_SELECTSTATE = 'MAP_SELECTSTATE';
export const MAP_RESET = 'MAP_RESET';

export function addLeg(journey) {
  return { type: MAP_ADDLEG, journey };
}

export function selectCountry(country) {
  return { type: MAP_SELECTCOUNTRY, country };
}

export function selectState(state) {
  return async (dispatch, getStore) => {
    dispatch({ type: MAP_SELECTSTATE, state });

    const { selectedJourney, selectedCountry, selectedState } = getStore().map;
    const response = await api.post('/leg/create', {
      journeyId: selectedJourney.id,
      country: selectedCountry,
      state: selectedState,
    });

    if (response) {
      dispatch(journeyActions.fetchJourneys());
    }
  };
}

export function reset() {
  return { type: MAP_RESET };
}
