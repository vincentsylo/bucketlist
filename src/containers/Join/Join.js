import React, { Component } from 'react';
import { api } from '../../utils';
import styles from './Join.css';

export default class Join extends Component {
  state = {
    email: '',
    password: '',
  };

  signup(e) {
    const { email, password } = this.state;
    e.preventDefault();

    api.post('/user/signup', { email, password });
  }

  render() {
    return (
      <div className={styles.root}>
        <form>
          <input type="email" onChange={(e) => this.setState({ email: e.target.value })} />
          <input type="password" onChange={(e) => this.setState({ password: e.target.value })} />
          <button type="submit" onClick={::this.signup}>Submit</button>
        </form>
      </div>
    );
  }
}
