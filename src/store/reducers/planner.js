import {
  LEG_SELECT,
} from '../actions/plannerActions';

const initialState = {
  selectedLeg: null,
  plannerView: '',
};

export default function planner(state = initialState, action) {
  switch (action.type) {
    case LEG_SELECT:
      return {
        ...state,
        selectedLeg: action.leg,
        plannerView: action.view,
      };
    default:
      return state;
  }
}
