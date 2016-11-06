import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import template from '../template';
import { CallToAction } from '../../../components';
import Activities from './Activities/Activities';
import GettingHere from './GettingHere/GettingHere';
import Origin from './Origin/Origin';
import Hotels from './Hotels/Hotels';
import AddLeg from '../AddLeg/AddLeg';
import styles from './Planner.css';

@template()
@connect(state => ({
  selectedLeg: state.planner.selectedLeg,
  plannerView: state.planner.plannerView,
}))
export default class Planner extends Component {
  static propTypes = {
    journey: PropTypes.object,
    selectedLeg: PropTypes.object,
    plannerView: PropTypes.string,
  };

  renderCallToAction() {
    const { journey, selectedLeg } = this.props;

    if (journey.legs.length === 1) {
      return (
        <CallToAction title="Getting started" className={styles.callToAction}>
          <div>
            <div className={styles.content}>Create your first leg of your trip!</div>
            <AddLeg journey={journey} />
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

  renderOptions() {
    const { selectedLeg, plannerView } = this.props;

    return [
      <Origin key="origin" selected={selectedLeg.isOrigin} />,
      <Activities key="activities" selected={plannerView === 'activities' && !selectedLeg.isOrigin} />,
      <GettingHere key="getting-here" selected={plannerView === 'getting-here' && !selectedLeg.isOrigin} />,
      <Hotels key="hotels" selected={plannerView === 'hotels' && !selectedLeg.isOrigin} />,
    ];
  }

  render() {
    const { journey } = this.props;

    return journey ? (
      <div className={styles.root}>
        {::this.renderCallToAction() || ::this.renderOptions()}
      </div>
    ) : null;
  }
}
