import React, { Component } from 'react';
import HeaderLink from '../HeaderLink/HeaderLink';
import styles from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <div className={styles.leftColumn}>
            <nav>
              <HeaderLink to="/">Home</HeaderLink>
              <HeaderLink to="/map">Map</HeaderLink>
              <HeaderLink to="/contact">Contact</HeaderLink>
            </nav>
          </div>
          <div className={styles.rightColumn}>
            <HeaderLink to="/join">Join</HeaderLink>
            <HeaderLink to="/login">Login</HeaderLink>
          </div>
        </header>
      </div>
    );
  }
}
