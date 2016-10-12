import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import cx from 'classnames';
import { connect } from 'react-redux';
import { plannerActions } from '../../../../store/actions';
import styles from './Leg.css';

@connect(state => ({ selectedLeg: state.planner.selectedLeg }))
export default class Leg extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    enableBookings: PropTypes.bool,
    leg: PropTypes.object,
    originLeg: PropTypes.object,
    selectedLeg: PropTypes.object,
  };

  render() {
    const { dispatch, enableBookings, leg, originLeg, selectedLeg } = this.props;
    const displayLeg = originLeg || leg;
    const isOrigin = displayLeg.isOrigin;

    const rootCls = cx(styles.root, {
      [styles.isOrigin]: isOrigin,
    });
    const contentCls = cx(styles.content, {
      [styles.selected]: _.isEqual(displayLeg, selectedLeg),
    });

    return (
      <div className={rootCls}>
        <div className={contentCls} onClick={() => dispatch(plannerActions.selectLeg(displayLeg))}>
          <div className={styles.date}>
            <div>{moment(displayLeg.departureDate || displayLeg.arrivalDate).format('MMM DD')}</div>
            <div>{moment(displayLeg.departureDate || displayLeg.arrivalDate).format('YYYY')}</div>
          </div>
          <div className={styles.destination}>
            <div>{displayLeg.originState || displayLeg.destinationState}</div>
            <div>{displayLeg.originCountry || displayLeg.destinationCountry}</div>
          </div>
          <div className={styles.actions}>
            { enableBookings ? 'bookings' : null }
          </div>
        </div>
        <div className={styles.verticalLine} />
      </div>
    );
  }
}
