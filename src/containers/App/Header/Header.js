import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ReactCookie from 'react-cookie';
import { authActions } from '../../../store/actions';
import HeaderLink from './HeaderLink/HeaderLink';
import styles from './Header.css';

const authorisedNav = ['/journey'];

@connect(state => ({ user: state.auth.user }))
export default class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.handleLogout = ::this.handleLogout;
  }

  async handleLogout(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    ReactCookie.remove('access_token');
    dispatch(authActions.fetchAuth());
    browserHistory.push('/');
  }

  render() {
    const { validated } = this.props.user;

    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <div className={styles.leftColumn}>
            <nav>
              <HeaderLink to="/">Home</HeaderLink>
              <HeaderLink to="/contact">Contact</HeaderLink>
              { validated ? authorisedNav.map((link, i) => <HeaderLink to="/journeys" key={i}>Journeys</HeaderLink>) : null }
            </nav>
          </div>
          {
            validated ? (
              <div className={styles.rightColumn}>
                <HeaderLink onClick={this.handleLogout}>Logout</HeaderLink>
              </div>
            ) : (
              <div className={styles.rightColumn}>
                <HeaderLink to="/join">Join</HeaderLink>
                <HeaderLink to="/login">Login</HeaderLink>
              </div>
            )
          }
        </header>
      </div>
    );
  }
}
