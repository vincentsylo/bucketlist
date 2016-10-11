import {
  LEG_SELECT,
} from '../actions/plannerActions';

const initialState = {
  selectedLeg: null,
};

export default function map(state = initialState, action) {
  switch (action.type) {
    case LEG_SELECT:
      return {
        ...state,
        selectedLeg: action.leg,
      };
    default:
      return state;
  }
}
