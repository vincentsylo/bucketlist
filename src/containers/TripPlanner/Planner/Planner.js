import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import template from '../template';
import CallToAction from '../../../components/CallToAction/CallToAction';
import AddLeg from '../AddLeg/AddLeg';
import styles from './Planner.css';

@template()
@connect(state => ({ selectedLeg: state.planner.selectedLeg }))
export default class Planner extends Component {
  static propTypes = {
    journey: PropTypes.object,
    selectedLeg: PropTypes.object,
  };

  renderCallToAction() {
    const { journey, selectedLeg } = this.props;

    if (journey.legs.length === 0) {
      return (
        <CallToAction title="Getting started" className={styles.callToAction}>
          <div>
            <div className={styles.content}>Create your first leg of your trip!</div>
            <AddLeg journeyId={journey.id} />
          </div>
        </CallToAction>
      );
    } else if (!selectedLeg) {
      return (
        <CallToAction title="Next steps" className={styles.callToAction}>
          <div>
            <div className={styles.content}>Select a leg from your timeline to plan your flights, hotels and activities!</div>
          </div>
        </CallToAction>
      );
    }

    return null;
  }

  render() {
    const { journey } = this.props;

    return journey ? (
      <div className={styles.root}>
        {::this.renderCallToAction()}
      </div>
    ) : null;
  }
}
