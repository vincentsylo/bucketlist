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

  render() {
    const { journey } = this.props;

    if (journey) {
      const { legs } = journey;

      return (
        <div className={styles.root}>
          <div className={styles.origin} />
          {
            legs.map((leg, i) => {
              const displayLeg = {
                ...leg,
                enableTransport: !leg.isOrigin,
                enableHotels: !leg.isOrigin && i !== legs.length - 1,
              };
              return <Leg leg={displayLeg} key={leg.id} />;
            })
          }
          <AddLeg journey={journey} />
        </div>
      );
    }
    return null;
  }
}
