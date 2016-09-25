import React, { Component, PropTypes } from 'react';
import styles from './Leg.css';

export default class Leg extends Component {
  static propTypes = {
    leg: PropTypes.object.isRequired,
  };

  render() {
    const { country, state } = this.props.leg;

    return (
      <div className={styles.root}>
        {country} {state}
      </div>
    );
  }
}