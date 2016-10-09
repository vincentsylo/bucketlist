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
    origin: '',
    date: moment(),
  };

  showValidation() {
    this.setState({
      showValidation: true,
    });
  }

  async createJourney(e) {
    e.preventDefault();

    const { fetchJourneys } = this.props;
    const { name, origin, date } = this.state;

    if (name && date && origin) {
      await api.post('/journey/create', { name });

      this.setState({ name: '', date: moment(), origin: '' });
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
    const { showForm, name, date, origin, showValidation } = this.state;
    const rootCls = cx(styles.root, className);
    const formCls = cx(styles.content, {
      [styles.showForm]: showForm,
    });

    return (
      <div className={rootCls} onClick={this.showForm}>
        <div className={formCls}>
          {
            showForm ? (
              <form method="POST" onSubmit={this.createJourney}>
                <TextInput
                  label="Name your trip"
                  placeholder="Around the world"
                  value={name}
                  onChange={e => this.setState({ name: e.target.value })}
                  required
                  showValidation={showValidation}
                />
                <TextInput
                  label="Origin city"
                  placeholder="Sydney, Australia"
                  value={origin}
                  onChange={e => this.setState({ origin: e.target.value })}
                  required
                  showValidation={showValidation}
                />
                <DateInput
                  label="Departing on"
                  value={date}
                  onChange={newDate => this.setState({ date: newDate })}
                  required
                  showValidation={showValidation}
                />
                <Button type="submit">Create your trip</Button>
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
