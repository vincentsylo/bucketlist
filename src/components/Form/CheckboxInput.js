import React, { Component, PropTypes } from 'react';
import formInput from './formInput';

@formInput()
export default class CheckboxInput extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const { onChange, ...rest } = this.props;

    return <input type="checkbox" onChange={onChange} {...rest} />;
  }
}
