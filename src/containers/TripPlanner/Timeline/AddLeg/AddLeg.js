import React, { Component } from 'react';
import cx from 'classnames';
import moment from 'moment';
import { TextInput, DateInput } from '../../../../components/Form';
import { Button } from '../../../../components';
import styles from './AddLeg.css';

export default class AddLeg extends Component {
  constructor(props) {
    super(props);

    this.showForm = ::this.showForm;
    this.createLeg = ::this.createLeg;
    this.showValidation = ::this.showValidation;
  }

  state = {
    showForm: false,
    showValidation: false,
    country: '',
    state: '',
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

    const { country, state, arrivalDate } = this.state;

    if (country && state && arrivalDate) {
      await api.post('/journey/create', { country, state, arrivalDate });
      this.setState({ country: '', state: '', arrivalDate: moment() });
    } else {
      this.showValidation();
    }
  }

  render() {
    const { showForm, country, state, arrivalDate, showValidation } = this.state;
    const rootCls = cx(styles.root, {
      [styles.showForm]: showForm,
    });

    return (
      <div className={rootCls} onClick={this.showForm}>
        {
          showForm ? (
            <form method="POST" onSubmit={this.createLeg}>
              <TextInput
                label="Country"
                placeholder="Australia"
                value={country}
                onChange={e => this.setState({ country: e.target.value })}
                required
                showValidation={showValidation}
              />
              <TextInput
                label="State"
                placeholder="Sydney"
                value={state}
                onChange={e => this.setState({ state: e.target.value })}
                required
                showValidation={showValidation}
              />
              <DateInput
                label="Departing on"
                value={arrivalDate}
                onChange={date => this.setState({ arrivalDate: date })}
                required
                showValidation={showValidation}
              />
              <Button type="submit">Create leg</Button>
            </form>
          ) : (
            <span className={styles.title}>Add leg</span>
          )
        }
      </div>
    );
  }
}
