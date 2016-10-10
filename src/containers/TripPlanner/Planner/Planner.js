import React, { Component, PropTypes } from 'react';
import template from '../template';
import TutorialList from '../../../components/Tutorial/TutorialList';
import styles from './Planner.css';

const newTripTutorial = [1, 2, 3];

@template()
export default class Planner extends Component {
  static propTypes = {
    journey: PropTypes.object.isRequired,
  };

  render() {
    const { journey } = this.props;

    return (
      <div className={styles.root}>
        {journey.legs.length === 0 ? <TutorialList tutorials={newTripTutorial} /> : null}
      </div>
    );
  }
}
