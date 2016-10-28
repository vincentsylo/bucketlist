import React, { Component, PropTypes } from 'react';
import formInput from './formInput';

@formInput()
export default class TextInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  render() {
    const { onChange, value, ...rest } = this.props;

    return <input type="text" onChange={onChange} value={value} {...rest} />;
  }
}
