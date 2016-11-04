import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TextInput } from '../../../../components/Form';
import plannerTemplate from '../plannerTemplate';
import styles from './Activities.css';

@plannerTemplate()
@connect(state => ({ selectedLeg: state.planner.selectedLeg }))
export default class Activities extends Component {
  static propTypes = {
    selectedLeg: PropTypes.object,
  };

  state = {
    activitySearch: '',
  };

  render() {
    const { selectedLeg } = this.props;
    const { activitySearch } = this.state;

    console.log(selectedLeg);
    return (
      <div className={styles.root}>
        <TextInput placeholder="Search activities" icon="fa fa-search" value={activitySearch} onChange={e => this.setState({ activitySearch: e.target.value })} />
      </div>
    );
  }
}
