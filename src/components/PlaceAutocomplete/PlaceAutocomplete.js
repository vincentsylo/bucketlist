import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { googleMaps } from '../../utils';
import { TextInput } from '../Form';

export default class PlaceAutocomplete extends Component {
  state = {
    value: '',
    selected: null,
  };

  constructor(props) {
    super(props);

    this.autocompleteService = new window.google.maps.places.AutocompleteService();

    this.autocompleteInput = ::this.autocompleteInput;
  }

  autocompleteInput(e) {
    const { value } = e.target;

    this.setState({ value });
    this.autocompleteService.getPlacePredictions({ input: value }, suggestions => {
      console.log(suggestions);
    })
  }

  render() {
    const { ...rest } = this.props;
    const { value } = this.state;

    return (
      <TextInput
        ref={c => { this.input = c; }}
        value={value}
        onChange={this.autocompleteInput}
        {...rest}
      />
    );
  }
}
