import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import { plannerActions } from '../../../../store/actions';
import styles from './Leg.css';

@connect(state => ({ selectedLeg: state.planner.selectedLeg }))
export default class Leg extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    leg: PropTypes.object,
    originLeg: PropTypes.object,
    selectedLeg: PropTypes.object,
  };

  render() {
    const { dispatch, leg, originLeg, selectedLeg } = this.props;
    const displayLeg = originLeg || leg;

    return (
      <div className={styles.root} onClick={() => dispatch(plannerActions.selectLeg(leg))}>
        <div className={styles.content}>
          <div className={styles.date}>
            <div>{moment(displayLeg.departureDate || displayLeg.arrivalDate).format('MMM DD')}</div>
            <div>{moment(displayLeg.departureDate || displayLeg.arrivalDate).format('YYYY')}</div>
          </div>
          <div className={styles.destination}>
            <div>{displayLeg.originState || displayLeg.destinationState}</div>
            <div>{displayLeg.originCountry || displayLeg.destinationCountry}</div>
          </div>
          { _.isEqual(leg, selectedLeg) ? <div className={styles.selected} /> : null }
        </div>
        <div className={styles.verticalLine} />
      </div>
    );
  }
}
