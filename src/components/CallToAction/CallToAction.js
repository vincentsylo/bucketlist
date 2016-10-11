import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import styles from './CallToAction.css';

export default class CallToAction extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
  }
  render() {
    const { title, children, className } = this.props;
    const rootCls = cx(styles.root, className);

    return (
      <div className={rootCls}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
}
