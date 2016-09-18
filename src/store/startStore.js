import { fetchAuth } from './actions/auth';

export default (store) => {
  store.dispatch(fetchAuth());

  setInterval(() => store.dispatch(fetchAuth()), 60000);
}