import React, { Component, PropTypes } from 'react';
import { TextInput } from '../../../../components/Form';
import plannerTemplate from '../plannerTemplate';
import styles from './Activities.css';

@plannerTemplate()
export default class Activities extends Component {
  static propTypes = {
    selected: PropTypes.bool,
  };

  state = {
    activitySearch: '',
  };

  render() {
    const { selected } = this.props;
    const { activitySearch } = this.state;

    return selected ? (
      <div className={styles.root}>
        <TextInput placeholder="Search activities" icon="fa fa-search" value={activitySearch} onChange={e => this.setState({ activitySearch: e.target.value })} />
      </div>
    ) : null;
  }
}
