import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { mapActions } from '../../../store/actions';
import Leg from './Leg/Leg';
import styles from './Journey.css';

@connect()
export default class Journey extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    journey: PropTypes.object.isRequired,
  };

  state = {
    showLegs: false,
  };

  toggleShowLegs() {
    const { showLegs } = this.state;
    this.setState({ showLegs: !showLegs });
  }

  render() {
    const { showLegs } = this.state;
    const { journey, dispatch } = this.props;
    const { name, legs } = journey;

    const legsContainer = cx(styles.legsContainer, {
      [styles.hidden]: !showLegs,
    });

    return (
      <div className={styles.root} onClick={::this.toggleShowLegs}>
        {name}
        <div className={legsContainer}>
          {
            legs.length > 0 ? (
              legs.map((leg, i) => <Leg key={i} leg={leg} />)
            ) : (
              <div onClick={() => dispatch(mapActions.addLeg(journey))}>Add Origin City</div>
            )
          }
        </div>
      </div>
    );
  }
}