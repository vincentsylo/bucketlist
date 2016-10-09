import React, { Component } from 'react';
import cx from 'classnames';
import styles from './AddLeg.css';

export default class AddLeg extends Component {
  state = {
    showForm: false,
  };

  constructor(props) {
    super(props);

    this.showForm = ::this.showForm;
  }

  showForm() {
    const { showForm } = this.state;

    if (!showForm) {
      this.setState({showForm: true});
    }
  }

  render() {
    const { showForm } = this.state;
    const rootCls = cx(styles.root, {
      [styles.showForm]: showForm,
    });

    return (
      <div className={rootCls} onClick={this.showForm}>
        {
          showForm ? (
            <div className={styles.form}></div>
          ) : (
            <span className={styles.title}>Add leg</span>
          )
        }
      </div>
    );
  }
}
