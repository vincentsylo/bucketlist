import React, { Component } from 'react';
import styles from './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className={styles.root}>
        &copy; Copyright {new Date().getFullYear()}, Forty8 Studios
      </footer>
    );
  }
}
