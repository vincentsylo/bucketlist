import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import cx from 'classnames';
import styles from './Leg.css';

export default class Leg extends Component {
  static propTypes = {
    leg: PropTypes.object,
    originLeg: PropTypes.object,
  };

  render() {
    const { leg, originLeg } = this.props;
    const isOrigin = _.size(originLeg) > 0;
    const displayLeg = originLeg || leg;
    const contentCls = cx(styles.content, {
      [styles.originContent]: isOrigin,
    });
    const verticalLineCls = cx(styles.verticalLine, {
      [styles.origin]: isOrigin,
    });

    return (
      <div className={styles.root}>
        <div className={contentCls}>
          <span className={styles.destination}>{displayLeg.destination}</span>
          <span className={styles.date}>{moment(displayLeg.departureDate || displayLeg.arrivalDate).format('YYYY-MM-DD')}</span>
        </div>
        <div className={verticalLineCls} />
      </div>
    );
  }
}
