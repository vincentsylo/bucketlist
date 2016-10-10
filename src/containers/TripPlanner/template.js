import React, { Component, PropTypes } from 'react';
import styles from './template.css';

export default (title) => (
  WrappedComponent => (
    class template extends Component {
      render() {
        const { ...rest } = this.props;

        return (
          <div className={styles.root}>
            { title ? <span className={styles.title}>{title}</span> : null }
            <WrappedComponent {...rest} />
          </div>
        );
      }
    }
  )
);
