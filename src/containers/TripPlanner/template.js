import React, { Component } from 'react';
import cx from 'classnames';
import styles from './template.css';

export default (title, className) => (
  WrappedComponent => (
    class template extends Component {
      render() {
        const { ...rest } = this.props;
        const rootCls = cx(styles.root, className);

        return (
          <div className={rootCls}>
            { title ? <span className={styles.title}>{title}</span> : null }
            <WrappedComponent {...rest} />
          </div>
        );
      }
    }
  )
);
