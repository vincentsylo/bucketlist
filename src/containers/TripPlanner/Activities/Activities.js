import React, { Component, PropTypes } from 'react';
import template from '../template';
import { TextInput } from '../../../components/Form';
import styles from './Activities.css';

@template()
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
