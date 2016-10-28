import React, { Component, PropTypes } from 'react';
import { googleMaps } from '../../utils';
import { TextInput } from '../Form';
import styles from './PlaceAutocomplete.css';

export default class PlaceAutocomplete extends Component {
  static propTypes = {
    selectPlace: PropTypes.func.isRequired,
    selectedPlace: PropTypes.object,
  };

  state = {
    focused: false,
    value: '',
    suggestions: [],
    showSuggestions: false,
  };

  constructor(props) {
    super(props);

    this.autocompleteService = new window.google.maps.places.AutocompleteService();

    this.autocompleteInput = ::this.autocompleteInput;
    this.handleSelect = ::this.handleSelect;
  }

  autocompleteInput(e) {
    const { selectPlace } = this.props;
    const { value } = e.target;

    selectPlace({});
    this.setState({ value }, () => {
      if (value) {
        this.autocompleteService.getPlacePredictions({ input: value, types: ['(cities)'] }, suggestions => {
          if (suggestions) {
            this.setState({ suggestions, showSuggestions: true });
          } else {
            this.setState({ suggestions: [] });
          }
        });
      } else {
        this.setState({ suggestions: [] });
      }
    });
  }

  handleSelect(place, selectPlace) {
    this.setState({
      value: place.description,
      suggestions: [],
      showSuggestions: false,
    });
    selectPlace(place);
  }

  render() {
    const { selectPlace, selectedPlace, ...rest } = this.props;
    const { focused, value, suggestions, showSuggestions } = this.state;

    return (
      <div className={styles.root}>
        <TextInput
          onBlur={() => setTimeout(() => this.setState({ focused: false, showSuggestions: false }), 200)}
          onFocus={() => this.setState({ focused: true, showSuggestions: true })}
          value={focused ? value : selectedPlace.description || ''}
          onChange={this.autocompleteInput}
          {...rest}
        />
        {
          showSuggestions ? (
            <div className={styles.suggestions}>
              {
                suggestions.map((suggestion, i) => {
                  return <div key={i} className={styles.suggestion} onClick={() => this.handleSelect(suggestion, selectPlace)}>{suggestion.description}</div>
                })
              }
            </div>
          ) : null
        }
      </div>
    );
  }
}
