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
    const rootCls = cx(styles.root, {
      [styles.originRoot]: isOrigin,
    });

    return (
      <div className={rootCls}>
        <span className={styles.destination}>{displayLeg.destination}</span>
        <span className={styles.date}>{moment(displayLeg.departureDate).format('YYYY-MM-DD')}</span>
      </div>
    );
  }
}
