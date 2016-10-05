import React, { Component } from 'react';
import { api } from '../../utils';
import styles from './Join.css';

export default class Join extends Component {
  constructor(props) {
    super(props);

    this.signup = ::this.signup;
  }

  state = {
    email: '',
    password: '',
  };

  async signup(e) {
    e.preventDefault();

    const { email, password } = this.state;
    await api.post('/user/signup', { email, password });
  }

  render() {
    return (
      <div className={styles.root}>
        <form>
          <input type="email" onChange={e => this.setState({ email: e.target.value })} />
          <input type="password" onChange={e => this.setState({ password: e.target.value })} />
          <button type="submit" onClick={this.signup}>Submit</button>
        </form>
      </div>
    );
  }
}
