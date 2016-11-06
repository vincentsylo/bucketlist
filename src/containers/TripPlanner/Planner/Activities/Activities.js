import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { TextInput } from '../../../../components/Form';
import plannerTemplate from '../plannerTemplate';
import styles from './Activities.css';

@plannerTemplate()
@connect(state => ({ selectedLeg: state.planner.selectedLeg }))
export default class Activities extends Component {
  static propTypes = {
    selectedLeg: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.map = document.createElement('div');
    this.placesService = new window.google.maps.places.PlacesService(this.map);

    this.findPlaces = ::this.findPlaces;
  }

  state = {
    activitySearch: '',
    results: [],
  };

  findPlaces(e) {
    const { selectedLeg } = this.props;
    const { value } = e.target;

    this.setState({ activitySearch: value }, async () => {
      const place = selectedLeg.place;
      this.placesService.nearbySearch({
        location: new window.google.maps.LatLng(place.latitude, place.longitude),
        radius: '500',
        types: ['restaurant'],
        keyword: value,
      }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          this.setState({ results });
        }
      });
    });
  }

  render() {
    const { activitySearch, results } = this.state;

    return (
      <div className={styles.root}>
        <div className={cx(styles.column, styles.planningBox)}>
          <h2>Activities</h2>
        </div>
        <div className={styles.column}>
          <h2>Suggestions</h2>
          <TextInput placeholder="Search activities" icon="fa fa-search" value={activitySearch} onChange={this.findPlaces} />
          {
            results.map((result, i) => {
              const img = result.photos ? <img src={result.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })} /> : null;
              return (
                <div key={i}>
                  {img}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
