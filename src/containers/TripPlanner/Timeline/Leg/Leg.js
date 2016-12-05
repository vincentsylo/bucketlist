import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import cx from 'classnames';
import { connect } from 'react-redux';
import { plannerActions, journeyActions } from '../../../../store/actions';
import { api } from '../../../../utils';
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
    journey: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.selectDelete = ::this.selectDelete;
    this.selectSettings = ::this.selectSettings;
  }

  selectLeg(e, view) {
    e.stopPropagation();

    const { dispatch, leg } = this.props;

    dispatch(plannerActions.selectLeg(leg, view));
  }

  async selectDelete(e) {
    e.stopPropagation();

    const { dispatch, leg, journey } = this.props;

    await api.post('/leg/remove', {
      legId: leg.id,
      journeyId: journey.id,
    });

    dispatch(journeyActions.fetchJourney(journey.id));
  }

  selectSettings(e) {
    e.stopPropagation();
  }

  render() {
    const { leg, selectedLeg, plannerView } = this.props;

    const rootCls = cx(styles.root, {
      [styles.isOrigin]: leg.isOrigin,
    });
    const contentCls = cx(styles.content, {
      [styles.selected]: _.isEqual(leg, selectedLeg),
    });

    const transportIconCls = cx(styles.icon, {
      [styles.enabled]: leg.enableTransport,
      [styles.selected]: plannerView === 'transport',
    });
    const hotelsIconCls = cx(styles.icon, {
      [styles.enabled]: leg.enableHotels,
      [styles.selected]: plannerView === 'hotel',
    });

    const hotelsLineCls = cx(styles.verticalLine, {
      [styles.hotels]: leg.hotel,
    });

    const transportLineCls = cx(styles.verticalLine, {
      [styles.flights]: leg.transport,
    });

    return (
      <div className={rootCls}>
        <div className={contentCls} onClick={e => this.selectLeg(e, 'activities')}>
          <div className={styles.settings}>
            {
              !leg.isOrigin ? (
                <span className={`${styles.setting} ${styles.deleteIcon} fa-stack`} onClick={e => this.selectDelete(e)}>
                  <span className="fa fa-square-o fa-stack-2x" />
                  <span className="fa fa-trash fa-stack-1x" />
                </span>
              ) : null
            }
            <span className={`${styles.setting} ${styles.settingsIcon} fa-stack`} onClick={this.selectSettings}>
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
            <div className={transportIconCls} onClick={e => this.selectLeg(e, 'transport')}>
              <span className="fa-stack">
                <span className="fa fa-square-o fa-stack-2x" />
                <span className="fa fa-plane fa-stack-1x" />
              </span>
            </div>
            <div className={hotelsIconCls} onClick={e => this.selectLeg(e, 'hotel')}>
              <span className="fa-stack">
                <span className="fa fa-square-o fa-stack-2x" />
                <span className="fa fa-bed fa-stack-1x" />
              </span>
            </div>
          </div>
        </div>
        <div className={cx(styles.verticalLine, styles.default)} />
        { leg.enableHotels ? <div className={hotelsLineCls} /> : null }
        { leg.enableTransport ? <div className={transportLineCls} /> : null }
      </div>
    );
  }
}
