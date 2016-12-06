import { api } from '../../utils';

export const LEG_SELECT = 'LEG_SELECT';

export function selectLeg(leg, view) {
  return async (dispatch, getState) => {
    const { selectedLeg, plannerView } = getState().planner;
    const { selectedJourney } = getState().journey;

    if (leg && view && view !== 'activities' && !leg[view]) {
      await api.post('/leg/update', {
        journeyId: selectedJourney.id,
        legId: leg.id,
        data: { [view]: true },
      });
      leg[view] = true;
    }

    const newLeg = selectedLeg === leg && plannerView === view ? null : leg;
    dispatch({ type: LEG_SELECT, leg: newLeg, view });
  };
}
