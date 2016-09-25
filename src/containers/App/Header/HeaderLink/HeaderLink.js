import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './HeaderLink.css';

export default class HeaderLink extends Component {
  static propTypes = {
    to: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.string.isRequired,
  };

  render() {
    const { to, onClick, children } = this.props;

    return onClick ? (
      <a className={styles.link} onClick={onClick}>{children}</a>
    ) : (
      <Link to={to} className={styles.link}>{children}</Link>
    );
  }
}
