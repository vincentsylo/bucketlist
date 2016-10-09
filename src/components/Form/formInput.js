import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import styles from './formInput.css';

export default () => (
  WrappedComponent => (
    class formInput extends Component {
      static propTypes = {
        label: PropTypes.string.isRequired,
        required: PropTypes.bool,
        showValidation: PropTypes.bool,
        value: PropTypes.string,
      };

      render() {
        const { label, required, value, showValidation, ...rest } = this.props;
        const inputClassName = cx(styles.input, {
          [styles.required]: required && !value && showValidation,
        });

        return (
          <div className={styles.root}>
            <label htmlFor={styles.root} className={styles.label}>{label}</label>
            <div className={styles.inputContainer}>
              <WrappedComponent
                id={styles.root}
                className={inputClassName}
                value={value}
                {...rest}
              />
              { required ? <span className={styles.requiredIcon} /> : null }
            </div>
          </div>
        );
      }
    }
  )
);
