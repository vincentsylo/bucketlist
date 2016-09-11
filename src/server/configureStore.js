import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      /* eslint-disable */
      const nextRootReducer = require('../reducers').default;
      /* eslint-enable */
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
