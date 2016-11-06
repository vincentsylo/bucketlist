import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import plannerTemplate from '../plannerTemplate';
import styles from './Origin.css';

@plannerTemplate()
@connect(state => ({ selectedLeg: state.planner.selectedLeg }))
export default class Origin extends Component {
  static propTypes = {
    selectedLeg: PropTypes.object,
  };

  render() {
    return (
      <div className={styles.root}>
        <h2>Origin</h2>
      </div>
    );
  }
}
