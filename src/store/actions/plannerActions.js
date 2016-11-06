export const LEG_SELECT = 'LEG_SELECT';

export function selectLeg(leg, view) {
  return (dispatch, getState) => {
    const { selectedLeg, plannerView } = getState().planner;
    const newLeg = selectedLeg === leg && plannerView === view ? null : leg;
    dispatch({ type: LEG_SELECT, leg: newLeg, view });
  };
}
