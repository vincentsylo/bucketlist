import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import plannerTemplate from '../plannerTemplate';
import styles from './Hotels.css';

@plannerTemplate()
@connect(state => ({ selectedLeg: state.planner.selectedLeg }))
export default class Hotels extends Component {
  static propTypes = {
    selectedLeg: PropTypes.object,
  };

  render() {
    const { selectedLeg } = this.props;
    const checkIn = moment(selectedLeg.date);
    const checkOut = moment(selectedLeg.nextLeg.date);

    return (
      <div className={styles.root}>
        <h2>Hotels in {selectedLeg.place.name}, {selectedLeg.place.country}</h2>
        <div>Check in: {checkIn.format('dddd DD MMM YYYY')}</div>
        <div>Check out: {checkOut.format('dddd DD MMM YYYY')}</div>
        <div>Nights: {checkOut.diff(checkIn, 'days')}</div>
      </div>
    );
  }
}
