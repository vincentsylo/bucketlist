import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import { api } from '../../../utils';
import { journeyActions } from '../../../store/actions';
import { DateInput, CheckboxInput } from '../../../components/Form';
import { Button, PlaceAutocomplete } from '../../../components';
import styles from './AddLeg.css';

@connect()
export default class AddLeg extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    journey: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.showForm = ::this.showForm;
    this.createLeg = ::this.createLeg;
    this.showValidation = ::this.showValidation;
    this.returnLeg = ::this.returnLeg;
  }

  state = {
    showForm: false,
    showValidation: false,
    selectedPlace: {},
    date: moment(),
  };

  componentWillMount() {
    const { journey } = this.props;

    this.setState({
      date: moment(_.last(journey.legs).date).add('days', 1),
    });
  }

  showForm() {
    const { showForm } = this.state;

    if (!showForm) {
      this.setState({ showForm: true });
    }
  }

  showValidation() {
    this.setState({
      showValidation: true,
    });
  }

  returnLeg(e) {
    const { journey } = this.props;
    const originPlace = _(journey.legs)
      .filter('isOrigin')
      .first()
      .valueOf()
      .place;

    this.setState({
      selectedPlace: e.target.checked ? {
        description: originPlace.name,
        placeId: originPlace.placeId,
      } : {},
    });
  }

  async createLeg(e) {
    e.preventDefault();
    const { dispatch, journey } = this.props;
    const { selectedPlace, date } = this.state;

    if (selectedPlace && date) {
      await api.post('/leg/create', { place: selectedPlace, date, journeyId: journey.id });
      this.setState({ selectedPlace: {}, date: moment(date).add('days', 1), showForm: false });
      dispatch(journeyActions.fetchJourney(journey.id));
    } else {
      this.showValidation();
    }
  }

  render() {
    const { journey } = this.props;
    const { showForm, selectedPlace, date, showValidation } = this.state;

    return (
      <div className={styles.root}>
        {
          showForm ? (
            <form method="POST" onSubmit={this.createLeg} className={styles.form}>
              <PlaceAutocomplete
                label="Leg"
                placeholder="Enter your destination city"
                required
                showValidation={showValidation}
                selectPlace={place => this.setState({ selectedPlace: place })}
                selectedPlace={selectedPlace}
              />
              <DateInput
                label="Arriving on"
                value={date}
                onChange={newDate => this.setState({ date: newDate })}
                required
                showValidation={showValidation}
                minDate={moment(_.last(journey.legs).date)}
              />
              <CheckboxInput label="Return leg?" onChange={this.returnLeg} />
              <Button type="submit" className={styles.submit}>Create leg</Button>
            </form>
          ) : (
            <Button onClick={this.showForm}>Add leg</Button>
          )
        }
      </div>
    );
  }
}
