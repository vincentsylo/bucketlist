import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import styles from './Button.css';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    type: 'button',
  };

  render() {
    const { children, className, type, ...rest } = this.props;
    const rootClass = cx(styles.root, className);

    return (
      <button type={type} className={rootClass} {...rest}>
        {children}
      </button>
    );
  }
}
