import { authActions } from './actions';

export default (store) => {
  store.dispatch(authActions.checkAuthStatus());

  // setInterval(() => store.dispatch(authActions.checkAuthStatus()), 60000);
};
