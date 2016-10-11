import React, { Component, PropTypes } from 'react';
import template from '../template';
import CallToAction from '../../../components/CallToAction/CallToAction';
import AddLeg from '../AddLeg/AddLeg';
import styles from './Planner.css';

@template()
export default class Planner extends Component {
  static propTypes = {
    journey: PropTypes.object.isRequired,
  };

  render() {
    const { journey } = this.props;

    return journey ? (
      <div className={styles.root}>
        {
          journey.legs.length === 0 ? (
            <CallToAction title="Getting started" className={styles.callToAction}>
              <div>
                <div className={styles.content}>Create your first leg of your trip!</div>
                <AddLeg journeyId={journey.id} />
              </div>
            </CallToAction>
          ) : null
        }
      </div>
    ) : null;
  }
}
