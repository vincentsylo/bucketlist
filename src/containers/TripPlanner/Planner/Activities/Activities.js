import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';
import { TextInput } from '../../../../components/Form';
import plannerTemplate from '../plannerTemplate';
import styles from './Activities.css';

const types = [{
  name: 'Restaurants',
  icon: 'fa-cutlery',
  type: 'restaurant',
}, {
  name: 'Bar',
  icon: 'fa-glass',
  type: 'bar',
}, {
  name: 'Cafe',
  icon: 'fa-coffee',
  type: 'cafe',
}, {
  name: 'Shopping Mall',
  icon: 'fa-shopping-bag',
  type: 'shopping_mall',
}];

@plannerTemplate()
@connect(state => ({ selectedLeg: state.planner.selectedLeg }))
export default class Activities extends Component {
  static propTypes = {
    selectedLeg: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.findPlaces = ::this.findPlaces;
    this.recenterMap = ::this.recenterMap;
  }

  state = {
    activitySearch: '',
    results: [],
    type: '',
    selectedPlace: null,
  };

  componentDidMount() {
    const { selectedLeg } = this.props;
    this.recenterMap(selectedLeg);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedLeg !== nextProps.selectedLeg) {
      this.setState({ results: [] });
      this.recenterMap(nextProps.selectedLeg);
    }
  }

  recenterMap(selectedLeg) {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: selectedLeg.place.latitude, lng: selectedLeg.place.longitude },
      zoom: 15,
    });
    this.placesService = new window.google.maps.places.PlacesService(this.map);
    this.infoWindow = new window.google.maps.InfoWindow();
  }

  findPlaces(value) {
    const { type } = this.state;
    const { selectedLeg } = this.props;

    this.setState({ activitySearch: value }, async () => {
      _.each(this.markers, marker => marker.setMap(null));
      this.markers = [];
      const place = selectedLeg.place;
      this.placesService.nearbySearch({
        location: new window.google.maps.LatLng(place.latitude, place.longitude),
        radius: '1000',
        types: [type],
        keyword: value,
      }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          this.setState({ results }, () => {
            _.each(results, result => {
              const map = this.map;
              const infoWindow = this.infoWindow;
              const marker = new window.google.maps.Marker({
                map,
                position: result.geometry.location
              });
              window.google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(result.name);
                infoWindow.open(map, this);
              });
              this.markers.push(marker);
            })
          });
        }
      });
    });
  }

  selectType(type) {
    this.setState({ type }, () => this.findPlaces(this.state.activitySearch));
  }

  selectPlace(place) {
    this.setState({ selectedPlace: place }, () => {
      this.placesService.getDetails({ placeId: place.place_id }, (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log(result);
        }
      })
    });
  }

  render() {
    const { activitySearch, results, selectedPlace } = this.state;
    const mapCls = cx(styles.map, {
      [styles.half]: selectedPlace,
    });

    return (
      <div className={styles.root}>
        <div className={cx(styles.column, styles.planningBox)}>
          <h2>Activities</h2>
          <div className={styles.column}>
            <div id="map" className={mapCls} />
          </div>
        </div>
        <div className={cx(styles.column, styles.suggestionBox)}>
          <h2>Suggestions</h2>
          <div className={styles.typeButtons}>
            {
              types.map((type, i) => {
                const cls = cx(styles.typeButton, {
                  [styles.selected]: this.state.type === type.type
                });
                return (
                  <button key={i} className={cls} onClick={() => this.selectType(type.type)}>
                    <span className={`fa ${type.icon}`}/>
                    <span>{type.name}</span>
                  </button>
                )
              })
            }
          </div>
          <TextInput placeholder="Search activities" icon="fa fa-search" value={activitySearch} onChange={(e) => this.findPlaces(e.target.value)} />
          <div className={cx(styles.column, styles.activitiesColumn)}>
            <div className={styles.activities}>
              {
                results.map((result, i) => {
                  const img = result.photos ? <img src={result.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })} className={styles.img} /> : null;

                  return (
                    <div key={i} style={{ background: `url(${img}) no-repeat center center #000`}} className={styles.activity} onClick={() => this.selectPlace(result)}>
                      {img}
                      <div className={styles.content}>
                        <span className={styles.title}>{result.name}</span>
                      </div>
                      {
                        result.rating ? (
                          <span className={styles.ratings}>
                            <span className={styles.rating}>{result.rating}</span>
                            <span className="fa fa-star" />
                          </span>
                        ) : null
                      }
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
