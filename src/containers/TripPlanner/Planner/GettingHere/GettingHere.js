import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import plannerTemplate from '../plannerTemplate';
import styles from './GettingHere.css';

@plannerTemplate()
@connect(state => ({ selectedLeg: state.planner.selectedLeg }))
export default class GettingHere extends Component {
  static propTypes = {
    selectedLeg: PropTypes.object,
  };

  render() {
    const { selectedLeg } = this.props;

    const depart = `${selectedLeg.prevLeg.place.name}, ${selectedLeg.prevLeg.place.country}`.replace(/ /g, '+');
    const arrive = `${selectedLeg.place.name}, ${selectedLeg.place.country}`.replace(/ /g, '+');
    const departureDate = moment(selectedLeg.prevLeg.date).format('YYYY-M-D');

    return (
      <div className={styles.root}>
        <iframe
          src={`//flights.loopminds.com/?depart=${depart}&arrive=${arrive}&departureDate=${departureDate}`}
          width="100%"
          className={styles.iframe}
          frameBorder="0"
        />
      </div>
    );
  }
}
