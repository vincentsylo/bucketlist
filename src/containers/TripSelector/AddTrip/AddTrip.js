import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import moment from 'moment';
import { api } from '../../../utils';
import { TextInput, DateInput } from '../../../components/Form';
import { Button } from '../../../components';
import styles from './AddTrip.css';

export default class AddTrip extends Component {
  static propTypes = {
    className: PropTypes.string,
    fetchJourneys: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.showForm = ::this.showForm;
    this.createJourney = ::this.createJourney;
    this.showValidation = ::this.showValidation;
  }

  state = {
    showForm: false,
    showValidation: false,
    name: '',
    originCountry: '',
    originState: '',
    departureDate: moment(),
  };

  showValidation() {
    this.setState({
      showValidation: true,
    });
  }

  async createJourney(e) {
    e.preventDefault();

    const { fetchJourneys } = this.props;
    const { name, originCountry, originState, departureDate } = this.state;

    if (name && originCountry && originState && departureDate) {
      await api.post('/journey/create', { name, originCountry, originState, departureDate });

      this.setState({ name: '', originCountry: '', originState: '', departureDate: moment() });
      fetchJourneys();
    } else {
      this.showValidation();
    }
  }

  showForm() {
    const { showForm } = this.state;

    if (!showForm) {
      this.setState({ showForm: true });
    }
  }

  render() {
    const { className } = this.props;
    const { showForm, name, originCountry, originState, departureDate, showValidation } = this.state;
    const rootCls = cx(styles.root, className);
    const formCls = cx(styles.content, {
      [styles.showForm]: showForm,
    });

    return (
      <div className={rootCls} onClick={this.showForm}>
        <div className={formCls}>
          {
            showForm ? (
              <form method="POST" onSubmit={this.createJourney} className={styles.form}>
                <TextInput
                  label="Name your trip"
                  labelStyle={styles.label}
                  placeholder="Around the world"
                  value={name}
                  onChange={e => this.setState({ name: e.target.value })}
                  required
                  showValidation={showValidation}
                />
                <TextInput
                  label="Origin country"
                  labelStyle={styles.label}
                  placeholder="Australia"
                  value={originCountry}
                  onChange={e => this.setState({ originCountry: e.target.value })}
                  required
                  showValidation={showValidation}
                />
                <TextInput
                  label="Origin state"
                  labelStyle={styles.label}
                  placeholder="Sydney"
                  value={originState}
                  onChange={e => this.setState({ originState: e.target.value })}
                  required
                  showValidation={showValidation}
                />
                <DateInput
                  label="Departing on"
                  labelStyle={styles.label}
                  value={departureDate}
                  onChange={date => this.setState({ departureDate: date })}
                  required
                  showValidation={showValidation}
                />
                <Button type="submit" className={styles.submit}>Create your trip</Button>
              </form>
            ) : (
              <span className={styles.title}>Create new trip</span>
            )
          }
        </div>
      </div>
    );
  }
}
