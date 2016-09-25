import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';
import _ from 'lodash';
import cx from 'classnames';
import { mapActions } from '../../store/actions';
import styles from './Map.css';

const apiKey = 'AIzaSyCo_l1V0crfU0KwR6ifIkYj8aG85B20IUA';

@connect(state => ({ ...state.map }))
export default class Map extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    selectionMode: PropTypes.oneOf(['', 'country', 'state']),
    selectedCountry: PropTypes.string,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.setupClickableState = ::this.setupClickableState;
    this.setupClickableCountries = ::this.setupClickableCountries;
    this.renderMap = ::this.renderMap;
  }

  componentWillUnmount() {
    delete window.drawCountry;
    delete window.drawState;

    if (this._script) {
      ReactDOM.unmountComponentAtNode(this._script);
      document.body.removeChild(this._script);
    }
  }

  setupClickableCountries(google) {
    const { dispatch } = this.props;

    function constructNewCoordinates(polygon) {
      return _.map(polygon.coordinates[0], (coordinate) => new google.maps.LatLng(coordinate[1], coordinate[0]));
    }

    function drawCountry(data) {
      _.forEach(data.rows, (row) => {
        let newCoordinates = [];
        const geometries = row[1].geometries;
        if (geometries) {
          _.forEach(geometries, (geometry) => {
            newCoordinates.push(constructNewCoordinates(geometry));
          });
        } else {
          newCoordinates = constructNewCoordinates(row[1].geometry);
        }
        const country = new google.maps.Polygon({
          paths: newCoordinates,
          strokeColor: '#ff9900',
          strokeOpacity: 1,
          strokeWeight: 0.3,
          fillColor: '#ffff66',
          fillOpacity: 0,
          name: row[0],
        });

        google.maps.event.addListener(country, 'mouseover', function () {
          this.setOptions({ fillOpacity: 0.4 });
        });
        google.maps.event.addListener(country, 'mouseout', function () {
          this.setOptions({ fillOpacity: 0 });
        });
        google.maps.event.addListener(country, 'click', () => {
          dispatch(mapActions.selectCountry(country.name));
        });

        country.setMap(google.map);
      });
    }

    window.drawCountry = drawCountry;

    this._script = document.createElement('script');
    const query = encodeURIComponent('SELECT name, kml_4326 FROM 1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ WHERE name DOES NOT CONTAIN \'Antarctica\'');
    this._script.src = `https://www.googleapis.com/fusiontables/v1/query?sql=${query}&callback=drawCountry&key=${apiKey}`;
    document.body.appendChild(this._script);
  }

  setupClickableState(google) {
    const { selectedCountry, dispatch } = this.props;

    function constructNewCoordinates(polygon) {
      return _.map(polygon.coordinates[0], (coordinate) => new google.maps.LatLng(coordinate[1], coordinate[0]));
    }

    function drawState(data) {
      _.forEach(data.rows, (row) => {
        let newCoordinates = [];
        const geometries = row[0].geometries;
        if (geometries) {
          _.forEach(geometries, (geometry) => {
            newCoordinates.push(constructNewCoordinates(geometry));
          });
        } else {
          newCoordinates = constructNewCoordinates(row[0].geometry);
        }
        const state = new google.maps.Polygon({
          paths: newCoordinates,
          strokeColor: '#ff9900',
          strokeOpacity: 1,
          strokeWeight: 0.3,
          fillColor: '#ffff66',
          fillOpacity: 0,
          name: row[1],
        });

        google.maps.event.addListener(state, 'mouseover', function () {
          this.setOptions({ fillOpacity: 0.4 });
        });
        google.maps.event.addListener(state, 'mouseout', function () {
          this.setOptions({ fillOpacity: 0 });
        });
        google.maps.event.addListener(state, 'click', () => {
          dispatch(mapActions.selectState(state.name));
        });

        state.setMap(google.map);
      });
    }

    window.drawState = drawState;

    this._script = document.createElement('script');
    const query = encodeURIComponent(`SELECT kml_4326, name_1 FROM 19lLpgsKdJRHL2O4fNmJ406ri9JtpIIk8a-AchA WHERE name_0 CONTAINS \'${selectedCountry}\'`);
    this._script.src = `https://www.googleapis.com/fusiontables/v1/query?sql=${query}&callback=drawState&key=${apiKey}`;
    document.body.appendChild(this._script);

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: selectedCountry }, (results) => {
      google.map.setCenter(results[0].geometry.location);
    });
  }

  createMapOptions() {
    return {
      styles: [
        {
          stylers: [
            { hue: '#00ffe6' },
            { saturation: -20 },
          ],
        }, {
          featureType: 'landscape',
          stylers: [
            { hue: '#ffff66' },
            { saturation: 100 },
          ],
        }, {
          featureType: 'road',
          stylers: [
            { visibility: 'off' },
          ],
        }, {
          featureType: 'administrative.land_parcel',
          stylers: [
            { visibility: 'off' },
          ],
        }, {
          featureType: 'administrative.locality',
          stylers: [
            { visibility: 'off' },
          ],
        }, {
          featureType: 'administrative.neighborhood',
          stylers: [
            { visibility: 'off' },
          ],
        }, {
          featureType: 'landscape.man_made',
          stylers: [
            { visibility: 'off' },
          ],
        }, {
          featureType: 'landscape.natural',
          stylers: [
            { visibility: 'off' },
          ],
        }, {
          featureType: 'poi',
          stylers: [
            { visibility: 'off' },
          ],
        }, {
          featureType: 'transit',
          stylers: [
            { visibility: 'off' },
          ],
        },
      ],
    };
  }

  renderMap() {
    const { selectionMode } = this.props;

    switch (selectionMode) {
      case 'country': return (
        <GoogleMap
          bootstrapURLKeys={{ key: apiKey }}
          center={{ lat: 0, lng: 0 }}
          zoom={2}
          options={this.createMapOptions()}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.setupClickableCountries}
        />
      );
      case 'state': return (
        <GoogleMap
          bootstrapURLKeys={{ key: apiKey }}
          center={{ lat: 0, lng: 0 }}
          zoom={2}
          options={this.createMapOptions()}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.setupClickableState}
        />
      );
      default:
        return (
          <GoogleMap
            bootstrapURLKeys={{ key: apiKey }}
            center={{ lat: 0, lng: 0 }}
            zoom={2}
            options={this.createMapOptions()}
          />
        );
    }
  }

  render() {
    const { className } = this.props;
    const mapCx = cx(styles.root, className);

    return (
      <div className={mapCx}>
        {this.renderMap()}
      </div>
    );
  }
}
