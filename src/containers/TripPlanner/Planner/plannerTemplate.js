import React, { Component, PropTypes } from 'react';
import styles from './plannerTemplate.css';

export default () => (
  WrappedComponent => (
    class plannerTemplate extends Component {
      static propTypes = {
        selected: PropTypes.bool,
      };

      render() {
        const { selected } = this.props;
        const { ...rest } = this.props;

        return selected ? (
          <div className={styles.root}>
            <WrappedComponent {...rest} />
          </div>
        ) : null;
      }
    }
  )
);
