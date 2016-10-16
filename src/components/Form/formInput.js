import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import styles from './formInput.css';

export default () => (
  WrappedComponent => (
    class formInput extends Component {
      static propTypes = {
        label: PropTypes.string,
        labelStyle: PropTypes.string,
        icon: PropTypes.string,
        required: PropTypes.bool,
        showValidation: PropTypes.bool,
        value: PropTypes.any,
      };

      render() {
        const { label, labelStyle, required, value, showValidation, icon, ...rest } = this.props;
        const inputClassName = cx(styles.input, {
          [styles.required]: required && !value && showValidation,
        });
        const id = _.uniqueId();

        return (
          <div className={styles.root}>
            <label htmlFor={id} className={cx(styles.label, labelStyle)}>{label}</label>
            <div className={styles.inputContainer}>
              <WrappedComponent
                id={id}
                className={inputClassName}
                value={value}
                {...rest}
              />
              { required ? <span className={styles.requiredIcon} /> : null }
              { icon ? <span className={cx(styles.icon, icon)} /> : null }
            </div>
          </div>
        );
      }
    }
  )
);
