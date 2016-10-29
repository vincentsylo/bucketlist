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
    leg: PropTypes.object,
    selectedLeg: PropTypes.object,
  };

  render() {
    const { dispatch, leg, selectedLeg } = this.props;

    const rootCls = cx(styles.root, {
      [styles.isOrigin]: leg.isOrigin,
    });
    const contentCls = cx(styles.content, {
      [styles.selected]: _.isEqual(leg, selectedLeg),
    });
    const transportCls = cx(styles.icon, {
      [styles.enabled]: leg.enableTransport,
    });
    const hotelsCls = cx(styles.icon, {
      [styles.enabled]: leg.enableHotels,
    });

    return (
      <div className={rootCls}>
        <div className={contentCls} onClick={() => dispatch(plannerActions.selectLeg(leg))}>
          <div className={styles.date}>
            <div>{moment(leg.date).format('MMM DD')}</div>
            <div>{moment(leg.date).format('YYYY')}</div>
          </div>
          <div className={styles.destination}>
            <div>{leg.place.state}</div>
            <div>{leg.place.country}</div>
          </div>
          <div className={styles.actions}>
            <div className={transportCls}>
              <span className="fa fa-plane" />
              { leg.enableTransport && leg.method ? <div className={cx(styles.verticalLine, styles.flight)}><span className={`${styles.inlineIcon} fa fa-plane`} /></div> : null }
            </div>
            <div className={hotelsCls}>
              <span className="fa fa-bed" />
              { leg.enableHotels && leg.hotel ? <div className={cx(styles.verticalLine, styles.hotels)}><span className={`${styles.inlineIcon} fa fa-bed`} /></div> : null }
            </div>
          </div>
        </div>
        <div className={cx(styles.verticalLine, styles.default)} />
      </div>
    );
  }
}
