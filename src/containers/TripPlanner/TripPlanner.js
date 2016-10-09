import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { journeyActions } from '../../store/actions';
import Timeline from './Timeline/Timeline';
import Planner from './Planner/Planner';
import Activities from './Activities/Activities';
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

    return (
      <div className={styles.root}>
        <div className={cx(styles.left, styles.column)}><Timeline title="Timeline" journey={journey} /></div>
        <div className={cx(styles.center, styles.column)}><Planner title="Planner" /></div>
        <div className={cx(styles.right, styles.column)}><Activities title="Activities" /></div>
      </div>
    );
  }
}
