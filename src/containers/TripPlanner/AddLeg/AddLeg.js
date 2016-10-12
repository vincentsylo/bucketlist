import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { api } from '../../../utils';
import { journeyActions } from '../../../store/actions';
import { TextInput, DateInput } from '../../../components/Form';
import { Button } from '../../../components';
import styles from './AddLeg.css';

@connect()
export default class AddLeg extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    journeyId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.showForm = ::this.showForm;
    this.createLeg = ::this.createLeg;
    this.showValidation = ::this.showValidation;
  }

  state = {
    showForm: false,
    showValidation: false,
    destinationCountry: '',
    destinationState: '',
    arrivalDate: moment(),
  };

  showForm() {
    const { showForm } = this.state;

    if (!showForm) {
      this.setState({showForm: true});
    }
  }

  showValidation() {
    this.setState({
      showValidation: true,
    });
  }

  async createLeg(e) {
    e.preventDefault();
    const { dispatch, journeyId } = this.props;
    const { destinationCountry, destinationState, arrivalDate } = this.state;

    if (destinationCountry && destinationState && arrivalDate) {
      await api.post('/leg/create', { destinationCountry, destinationState, arrivalDate, journeyId });
      this.setState({ destinationCountry: '', destinationState: '', arrivalDate: moment(), showForm: false });
      dispatch(journeyActions.fetchJourney(journeyId));
    } else {
      this.showValidation();
    }
  }

  render() {
    const { showForm, destinationCountry, destinationState, arrivalDate, showValidation } = this.state;

    return (
      <div className={styles.root}>
        {
          showForm ? (
            <form method="POST" onSubmit={this.createLeg} className={styles.form}>
              <TextInput
                label="Country"
                placeholder="Australia"
                value={destinationCountry}
                onChange={e => this.setState({ destinationCountry: e.target.value })}
                required
                showValidation={showValidation}
              />
              <TextInput
                label="State"
                placeholder="Sydney"
                value={destinationState}
                onChange={e => this.setState({ destinationState: e.target.value })}
                required
                showValidation={showValidation}
              />
              <DateInput
                label="Arriving on"
                value={arrivalDate}
                onChange={date => this.setState({ arrivalDate: date })}
                required
                showValidation={showValidation}
              />
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
