import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { mapActions } from '../../store/actions';
import Map from '../../components/Map/Map';
import JourneyList from './JourneyList/JourneyList';
import styles from './Journeys.css';

@connect(state => ({ ...state.map }))
export default class Journeys extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    selectionMode: PropTypes.oneOf(['', 'country', 'state']),
  };

  componentWillUnmount() {
    this.props.dispatch(mapActions.reset());
  }

  render() {
    const { selectionMode } = this.props;

    return (
      <div className={styles.root}>
        <JourneyList />
        { selectionMode === 'country' ? <Map /> : null }
        { selectionMode === 'state' ? <Map /> : null }
        { selectionMode === '' ? <Map /> : null }
      </div>
    );
  }
}
