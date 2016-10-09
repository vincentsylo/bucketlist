import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import template from '../template';
import Leg from './Leg/Leg';
import AddLeg from './AddLeg/AddLeg';
import styles from './Timeline.css';

@template()
export default class Timeline extends Component {
  static propTypes = {
    journey: PropTypes.object,
  };

  render() {
    const { journey } = this.props;
    const { legs } = journey;
    const originLeg = {
      destination: journey.origin,
      departureDate: journey.departureDate,
    };

    return (
      <div className={styles.root}>
        <Leg originLeg={originLeg} />
        {_.map(legs, leg => <Leg leg={leg} key={leg.id} />)}
        <AddLeg />
      </div>
    );
  }
}
