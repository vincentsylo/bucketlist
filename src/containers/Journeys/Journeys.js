import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Map from '../../components/Map/Map';
import JourneyList from './JourneyList/JourneyList';
import styles from './Journeys.css';

@connect(state => ({ ...state.map }))
export default class Journeys extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    selectionMode: PropTypes.oneOf(['', 'country', 'state']),
  };

  render() {
    const { selectionMode } = this.props;
    const mapCx = cx({ [styles.hidden]: selectionMode !== '' });

    return (
      <div className={styles.root}>
        <JourneyList />
        { selectionMode === 'country' ? <Map /> : null }
        { selectionMode === 'state' ? <Map /> : null }
        <Map className={mapCx} />
      </div>
    );
  }
}
