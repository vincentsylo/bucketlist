export const LEG_SELECT = 'LEG_SELECT';

export function selectLeg(leg) {
  return (dispatch, getState) => {
    const newLeg = getState().planner.selectedLeg === leg ? null : leg;
    dispatch({ type: LEG_SELECT, leg: newLeg });
  };
}
