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

  constructor(props) {
    super(props);

    this.toggleShowLegs = ::this.toggleShowLegs;
  }

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
      <div className={styles.root}>
        <button onClick={this.toggleShowLegs}>{name}</button>
        <div className={legsContainer}>
          {
            legs.length > 0 ? (
              legs.map((leg, i) => <Leg key={i} leg={leg} />)
            ) : (
              <button onClick={() => dispatch(mapActions.addLeg(journey))}>Add Origin City</button>
            )
          }
        </div>
      </div>
    );
  }
}
