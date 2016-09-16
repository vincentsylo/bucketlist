import React, { Component } from 'react';
import { api } from '../../utils';
import styles from './Login.css';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  async login(e) {
    const { email, password } = this.state;
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });
    } catch (error) {
      console.log('invalid user');
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <form>
          <input type="email" name="email" onChange={(e) => this.setState({ email: e.target.value })} />
          <input type="password" name="password" onChange={(e) => this.setState({ password: e.target.value })} />
          <button type="submit" onClick={::this.login}>Submit</button>
        </form>
      </div>
    );
  }
}
