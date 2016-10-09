import React, { Component, PropTypes } from 'react';
import styles from './template.css';

export default () => (
  WrappedComponent => (
    class template extends Component {
      static propTypes = {
        title: PropTypes.string,
      };

      render() {
        const { title, ...rest } = this.props;

        return (
          <div className={styles.root}>
            <h2 className={styles.title}>{title}</h2>
            <WrappedComponent {...rest} />
          </div>
        );
      }
    }
  )
);
