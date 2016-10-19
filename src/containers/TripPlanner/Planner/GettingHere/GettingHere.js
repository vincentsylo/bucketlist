import React, { Component } from 'react';
import plannerTemplate from '../plannerTemplate';
import styles from './GettingHere.css';

@plannerTemplate()
export default class GettingHere extends Component {
  render() {
    return (
      <div className={styles.root}>
        Getting here
      </div>
    );
  }
}
