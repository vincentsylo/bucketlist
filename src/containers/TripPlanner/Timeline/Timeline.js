import React, { Component, PropTypes } from 'react';
import template from '../template';
import Leg from './Leg/Leg';
import AddLeg from '../AddLeg/AddLeg';
import styles from './Timeline.css';

@template('Timeline', styles.template)
export default class Timeline extends Component {
  static propTypes = {
    journey: PropTypes.object,
  };

  mapLeg(leg) {
    return {
      ...leg,
      state: leg.originState || leg.destinationState,
      country: leg.originCountry || leg.destinationCountry,
      date: leg.departureDate || leg.arrivalDate,
    };
  }

  render() {
    const { journey } = this.props;

    if (journey) {
      const { legs, originCountry, originState, departureDate } = journey;
      const originLeg = this.mapLeg({
        originState,
        originCountry,
        departureDate,
        isOrigin: true,
      });

      return (
        <div className={styles.root}>
          <div className={styles.origin} />
          <Leg leg={originLeg} />
          {
            legs.map((leg, i) => {
              const displayLeg = {
                ...leg,
                enableTransport: true,
                enableHotels: i !== legs.length - 1,
              };
              return <Leg leg={this.mapLeg(displayLeg)} key={leg.id} />;
            })
          }
          <AddLeg journey={journey} />
        </div>
      );
    }
    return null;
  }
}
