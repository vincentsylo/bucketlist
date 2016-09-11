import React, { Component } from 'react';
import styles from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.root}>
        <div className={styles.leftColumn}>Icon</div>
        <div className={styles.rightColumn}>Button</div>
      </header>
    )
  }
}