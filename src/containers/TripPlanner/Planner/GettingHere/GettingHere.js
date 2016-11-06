import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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

    return (
      <div className={styles.root}>
        <h2>Getting to {selectedLeg.place.name}, {selectedLeg.place.country}</h2>
      </div>
    );
  }
}
