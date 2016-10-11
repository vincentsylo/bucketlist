export const LEG_SELECT = 'LEG_SELECT';

export function selectLeg(leg) {
  return { type: LEG_SELECT, leg };
}
