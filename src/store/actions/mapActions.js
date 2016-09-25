import { api } from '../../utils';
import { journeyActions } from '../actions';

export const MAP_ADDLEG = 'MAP_ADDLEG';
export const MAP_SELECTCOUNTRY = 'MAP_SELECTCOUNTRY';
export const MAP_SELECTSTATE = 'MAP_SELECTSTATE';

export function addLeg(journey) {
  return dispatch => {
    dispatch({ type: MAP_ADDLEG, journey });
  };
}

export function selectCountry(country) {
  return dispatch => {
    dispatch({ type: MAP_SELECTCOUNTRY, country });
  };
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

