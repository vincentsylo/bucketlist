import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HeaderLink from './HeaderLink/HeaderLink';
import styles from './Header.css';

const authorisedNav = ['/journey'];

@connect(state => ({ user: state.auth.user }))
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  renderAuthorisedView() {
    const { user } = this.props;

    return user ? authorisedNav.map((link, i) => <HeaderLink to="/journeys" key={i}>Journeys</HeaderLink>) : null;
  }

  render() {
    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <div className={styles.leftColumn}>
            <nav>
              <HeaderLink to="/">Home</HeaderLink>
              <HeaderLink to="/map">Map</HeaderLink>
              <HeaderLink to="/contact">Contact</HeaderLink>
              {::this.renderAuthorisedView()}
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
