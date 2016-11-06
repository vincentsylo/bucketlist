import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import cx from 'classnames';
import { connect } from 'react-redux';
import { plannerActions } from '../../../../store/actions';
import styles from './Leg.css';

@connect(state => ({
  selectedLeg: state.planner.selectedLeg,
  plannerView: state.planner.plannerView,
}))
export default class Leg extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    leg: PropTypes.object,
    selectedLeg: PropTypes.object,
    plannerView: PropTypes.string,
  };

  selectLeg(e, view) {
    e.stopPropagation();

    const { dispatch, leg } = this.props;

    dispatch(plannerActions.selectLeg(leg, view));
  }

  render() {
    const { leg, selectedLeg, plannerView } = this.props;

    const rootCls = cx(styles.root, {
      [styles.isOrigin]: leg.isOrigin,
    });
    const contentCls = cx(styles.content, {
      [styles.selected]: _.isEqual(leg, selectedLeg),
    });
    const transportCls = cx(styles.icon, {
      [styles.enabled]: leg.enableTransport,
      [styles.selected]: plannerView === 'getting-here',
    });
    const hotelsCls = cx(styles.icon, {
      [styles.enabled]: leg.enableHotels,
      [styles.selected]: plannerView === 'hotels',
    });

    return (
      <div className={rootCls}>
        <div className={contentCls} onClick={e => this.selectLeg(e, 'activities')}>
          <div className={styles.settings}>
            <span className={`${styles.setting} fa-stack`}>
              <span className="fa fa-square-o fa-stack-2x" />
              <span className="fa fa-trash fa-stack-1x" />
            </span>
            <span className={`${styles.setting} fa-stack`}>
              <span className="fa fa-square-o fa-stack-2x" />
              <span className="fa fa-cog fa-stack-1x" />
            </span>
          </div>
          <div className={styles.date}>
            <div>{moment(leg.date).format('MMM DD')}</div>
            <div>{moment(leg.date).format('YYYY')}</div>
          </div>
          <div className={styles.destination}>
            <div>{leg.place.name}</div>
            <div>{leg.place.country}</div>
          </div>
          <div className={styles.actions}>
            <div className={transportCls} onClick={e => this.selectLeg(e, 'getting-here')}>
              <span className="fa-stack">
                <span className="fa fa-square-o fa-stack-2x" />
                <span className="fa fa-plane fa-stack-1x" />
              </span>
            </div>
            <div className={hotelsCls} onClick={e => this.selectLeg(e, 'hotels')}>
              <span className="fa-stack">
                <span className="fa fa-square-o fa-stack-2x" />
                <span className="fa fa-bed fa-stack-1x" />
              </span>
            </div>
          </div>
        </div>
        <div className={cx(styles.verticalLine, styles.default)} />
        { leg.enableHotels ? <div className={cx(styles.verticalLine, styles.hotels)} /> : null }
        { leg.enableTransport ? <div className={cx(styles.verticalLine, styles.flight)} /> : null }
      </div>
    );
  }
}
