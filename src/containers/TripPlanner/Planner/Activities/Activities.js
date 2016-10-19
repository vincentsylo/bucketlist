import React, { Component } from 'react';
import { TextInput } from '../../../../components/Form';
import plannerTemplate from '../plannerTemplate';
import styles from './Activities.css';

@plannerTemplate()
export default class Activities extends Component {
  state = {
    activitySearch: '',
  };

  render() {
    const { activitySearch } = this.state;

    return (
      <div className={styles.root}>
        <TextInput placeholder="Search activities" icon="fa fa-search" value={activitySearch} onChange={e => this.setState({ activitySearch: e.target.value })} />
      </div>
    );
  }
}
