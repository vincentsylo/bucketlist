import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from 'google-map-react';
import _ from 'lodash';
import styles from './Journeys.css';

const apiKey = 'AIzaSyCo_l1V0crfU0KwR6ifIkYj8aG85B20IUA';

export default class Journeys extends Component {
  componentWillUnmount() {
    delete window.drawMap;

    ReactDOM.unmountComponentAtNode(this._script);
    document.body.removeChild(this._script);
  }

  setupMap(google) {
    function drawMap(data) {
      _(data['rows'])
        .reject((row) => row[0] === 'Antarctica')
        .forEach((row) => {
          let newCoordinates = [];
          const geometries = row[1]['geometries'];
          if (geometries) {
            _.forEach(geometries, (geometry) => {
              newCoordinates.push(constructNewCoordinates(geometry));
            });
          } else {
            newCoordinates = constructNewCoordinates(row[1]['geometry']);
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

          google.maps.event.addListener(country, 'mouseover', () => {
            this.setOptions({ fillOpacity: 0.4 });
          });
          google.maps.event.addListener(country, 'mouseout', () => {
            this.setOptions({ fillOpacity: 0 });
          });
          google.maps.event.addListener(country, 'click', () => {
            alert(this.name);
          });

          country.setMap(google.map);
        })
      }

    function constructNewCoordinates(polygon) {
      return _.map(polygon['coordinates'][0], (coordinate) => {
        return new google.maps.LatLng(coordinate[1], coordinate[0]);
      });
    }

    window.drawMap = drawMap;

    this._script = document.createElement('script');
    const query = encodeURIComponent('SELECT name, kml_4326 FROM 1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ');
    this._script.src = `https://www.googleapis.com/fusiontables/v1/query?sql=${query}&callback=drawMap&key=${apiKey}`
    document.body.appendChild(this._script);
  }

  createMapOptions() {
    return {
      styles: [
        {
          stylers: [
            { hue: "#00ffe6" },
            { saturation: -20 },
          ],
        }, {
          featureType: "landscape",
          stylers: [
            { hue: "#ffff66" },
            { saturation: 100 }
          ],
        }, {
          featureType: "road",
          stylers: [
            { visibility: "off" },
          ],
        }, {
          featureType: "administrative.land_parcel",
          stylers: [
            { visibility: "off" },
          ],
        }, {
          featureType: "administrative.locality",
          stylers: [
            { visibility: "off" },
          ],
        }, {
          featureType: "administrative.neighborhood",
          stylers: [
            { visibility: "off" },
          ],
        }, {
          featureType: "landscape.man_made",
          stylers: [
            { visibility: "off" },
          ]
        }, {
          featureType: "landscape.natural",
          stylers: [
            { visibility: "off" },
          ],
        }, {
          featureType: "poi",
          stylers: [
            { visibility: "off" },
          ],
        }, {
          featureType: "transit",
          stylers: [
            { visibility: "off" },
          ],
        },
      ],
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <GoogleMap
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={{ lat: 10, lng: 0 }}
          defaultZoom={2}
          options={this.createMapOptions()}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={::this.setupMap}
        />
      </div>
    );
  }
}
