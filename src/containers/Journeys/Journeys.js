import React, { Component, PropTypes } from 'react';
import Map from '../../components/Map/Map';
import JourneyList from '../../components/JourneyList/JourneyList';
import styles from './Journeys.css';

export default class Journeys extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Map />
      </div>
    );
  }
}
