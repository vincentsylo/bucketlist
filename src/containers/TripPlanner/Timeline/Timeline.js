import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import template from '../template';
import Leg from './Leg/Leg';
import AddLeg from '../AddLeg/AddLeg';
import styles from './Timeline.css';

@template('Timeline', styles.template)
export default class Timeline extends Component {
  static propTypes = {
    journey: PropTypes.object,
  };

  render() {
    const { journey } = this.props;

    if (journey) {
      const { legs, originCountry, originState, departureDate } = journey;
      const originLeg = {
        originState,
        originCountry,
        departureDate,
        isOrigin: true,
      };

      return (
        <div className={styles.root}>
          <div className={styles.origin} />
          <Leg originLeg={originLeg} enableBookings={legs.length > 0} />
          {legs.map((leg, i) => <Leg leg={leg} key={leg.id} enableBookings={i !== legs.length - 1} />)}
          <AddLeg journeyId={journey.id} />
        </div>
      );
    }
    return null;
  }
}
