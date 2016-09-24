export const MAP_ADDLEG = 'MAP_ADDLEG';
export const MAP_SELECTCOUNTRY = 'MAP_SELECTCOUNTRY';
export const MAP_SELECTSTATE = 'MAP_SELECTSTATE';

export function addLeg(journey) {
  return dispatch => {
    dispatch({
      type: MAP_ADDLEG,
      journey,
    });
  };
}

export function selectCountry(country) {
  return dispatch => {
    dispatch({
      type: MAP_SELECTCOUNTRY,
      country,
    });
  };
}

export function selectState(state) {
  return dispatch => {
    dispatch({
      type: MAP_SELECTSTATE,
      state,
    });
  };
}

