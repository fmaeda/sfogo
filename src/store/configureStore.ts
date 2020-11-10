import { composeWithDevTools } from 'redux-devtools-extension';
import {
  combineReducers,
  createStore,
  Store,
  Reducer,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

import allReducers, { RootState } from 'store';

const rootReducer = (persistReducer(
  {
    key: 'sisfogo',
    storage: sessionStorage,
    blacklist: ['notification', 'version'],
  },
  combineReducers({ ...allReducers }),
) as unknown) as Reducer<RootState>;

const middlewares = [thunk];

export default () => {
  const store: Store<RootState> = createStore<RootState, any, any, any>(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};
