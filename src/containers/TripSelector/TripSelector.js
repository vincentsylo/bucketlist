import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import CallToAction from '../../components/CallToAction/CallToAction';
import { journeyActions } from '../../store/actions';
import styles from './TripSelector.css';
import Trip from './Trip/Trip';
import AddTrip from './AddTrip/AddTrip';

@connect(state => ({ journeys: state.journey.journeys }))
export default class TripSelector extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    journeys: PropTypes.array.isRequired,
  };

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(journeyActions.fetchJourneys()),
    ]);
  }

  componentDidMount() {
    TripSelector.readyOnActions(this.props.dispatch);
  }

  render() {
    const { journeys, dispatch } = this.props;
    const displayRemainder = journeys.length % 3;
    const addCls = cx({
      [styles.addFlex]: displayRemainder !== 0,
      [styles.addFull]: displayRemainder === 0,
    });

    return (
      <div className={styles.root}>
        <div className={styles.journeyRoot}>
          {
            journeys.length > 0 ?
              journeys.map((journey, i) => <Trip journey={journey} key={i} />) : (
                <div className={styles.noJourneys}>
                  <CallToAction title="Create your first trip!">
                    <div>You can create as may trips as you like.</div>
                  </CallToAction>
                </div>
              )
          }
          <AddTrip className={addCls} fetchJourneys={() => TripSelector.readyOnActions(dispatch)} />
        </div>
      </div>
    );
  }
}
