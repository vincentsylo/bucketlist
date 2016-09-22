import React, { Component, PropTypes } from 'react';
import { journeyActions }  from '../../store/actions';
import { connect } from 'react-redux';

@connect(state => ({ journeys: state.journeys }))
export default class JourneyList extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    journeys: PropTypes.object,
  };

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(journeyActions.fetchJourneys()),
    ]);
  }

  componentDidMount() {
    JourneyList.readyOnActions(this.props.dispatch);
  }

  render() {
    return (
      <div></div>
    );
  }
}