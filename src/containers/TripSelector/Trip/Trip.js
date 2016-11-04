import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { googlePlaces } from '../../../utils';
import styles from './Trip.css';

export default class Trip extends Component {
  static propTypes = {
    journey: PropTypes.object,
  };

  render() {
    const { journey } = this.props;
    const photos = _.last(journey.legs).place.photos;
    const imageRef = _.first(photos).photo_reference;

    return (
      <div className={styles.journeyItem} onClick={() => browserHistory.push(`/trip-planner/${journey.id}`)}>
        <img src={googlePlaces.getImageUrl(imageRef)} className={styles.journeyImg} />
        <div className={styles.content}>
          <span className={styles.title}>{journey.name}</span>
        </div>
      </div>
    );
  }
}
