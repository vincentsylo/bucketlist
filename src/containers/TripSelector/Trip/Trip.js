import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import styles from './Trip.css';
import journeyImg from '../../../images/shibuya.jpg';

export default class Trip extends Component {
  static propTypes = {
    journey: PropTypes.object,
  };

  render() {
    const { journey } = this.props;

    return (
      <div className={styles.journeyItem} onClick={() => browserHistory.push(`/trip-planner/${journey.id}`)}>
        <img src={journeyImg} className={styles.journeyImg} />
        <div className={styles.content}>
          <span className={styles.title}>{journey.name}</span>
        </div>
      </div>
    );
  }
}
