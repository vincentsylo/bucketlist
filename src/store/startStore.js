import { authActions } from './actions';

export default (store) => {
  store.dispatch(authActions.fetchAuth());

  setInterval(() => store.dispatch(authActions.checkAuthStatus()), 60000);
}