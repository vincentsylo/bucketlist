import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import template from '../template';
import { Button, CallToAction } from '../../../components';
import Activities from './Activities/Activities';
import GettingHere from './GettingHere/GettingHere';
import AddLeg from '../AddLeg/AddLeg';
import styles from './Planner.css';

@template()
@connect(state => ({ selectedLeg: state.planner.selectedLeg }))
export default class Planner extends Component {
  static propTypes = {
    journey: PropTypes.object,
    selectedLeg: PropTypes.object,
  };

  state = {
    selectedTab: 'activities',
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedLeg !== nextProps.selectedLeg) {
      this.setState({ selectedTab: 'activities' });
    }
  }

  getButtonProps(type) {
    const { selectedTab } = this.state;

    return {
      className: cx(styles.tabTitle, { [styles.selected]: selectedTab === type }),
      onClick: () => this.selectTab(type),
    };
  }

  selectTab(tab) {
    this.setState({ selectedTab: tab });
  }

  renderCallToAction() {
    const { journey, selectedLeg } = this.props;

    if (journey.legs.length === 0) {
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
    const { selectedLeg } = this.props;
    const { selectedTab } = this.state;

    return !selectedLeg.isOrigin ? (
      <div className={styles.tabs}>
        <div className={styles.tabTitles}>
          <Button {...this.getButtonProps('activities')}>
            Activities
          </Button>
          <Button {...this.getButtonProps('getting-here')} disabled={!selectedLeg.enableTransport}>
            Getting here
          </Button>
          <Button {...this.getButtonProps('hotels')} disabled={!selectedLeg.enableHotels}>
            Hotels
          </Button>
        </div>
        <div className={styles.tabContainer}>
          <Activities selected={selectedTab === 'activities'} />
          <GettingHere selected={selectedTab === 'getting-here'} />
        </div>
      </div>
    ) : (
      <div>Origin</div>
    );
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
