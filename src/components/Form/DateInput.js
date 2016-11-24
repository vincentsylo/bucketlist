import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import formInput from './formInput';

@formInput()
export default class DateInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object,
  };

  render() {
    const { className, onChange, value, ...rest } = this.props;

    return (
      <DatePicker
        dateFormat="YYYY/MM/DD"
        selected={value}
        className={className}
        onChange={onChange}
        {...rest}
      />
    );
  }
}
