import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { api } from '../../utils';
import { authActions } from '../../store/actions';
import styles from './Login.css';

@connect()
export default class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  state = {
    email: '',
    password: '',
    rememberMe: false,
  };

  async login(e) {
    const { dispatch } = this.props;
    const { email, password, rememberMe } = this.state;
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password, rememberMe });

      if (response) {
        dispatch(authActions.fetchAuth());
      }
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
          <input type="checkbox" onChange={(e) => this.setState({ rememberMe: e.target.checked })} />
          <button type="submit" onClick={::this.login}>Submit</button>
        </form>
      </div>
    );
  }
}
