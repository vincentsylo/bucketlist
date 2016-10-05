import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { journeyActions } from '../../store/actions';
import styles from './TripPlanner.css';

@connect(state => ({ journey: state.journey.selectedJourney }))
export default class TripPlanner extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    journey: PropTypes.object,
  };

  static readyOnActions(dispatch, props) {
    return Promise.all([
      dispatch(journeyActions.fetchJourney(props.params.tripId)),
    ]);
  }

  componentDidMount() {
    TripPlanner.readyOnActions(this.props.dispatch, this.props);
  }

  render() {
    const { journey } = this.props;

    console.log(journey);
    return (
      <div className={styles.root}>
        Planner
      </div>
    );
  }
}
