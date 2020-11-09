import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from 'store/configureStore';
import { theme } from 'styles';

import './index.css';
import App from 'App';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { versionActions } from 'store/version';

const { store, persistor } = configureStore();

const render = (AppComponent: React.ComponentType) => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <AppComponent />
        </PersistGate>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement,
  );
};

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register({
  onSuccess: (evt) => {
    store.dispatch(versionActions.init());
    console.log('SW_init', evt);
  },
  onUpdate: (evt) => {
    console.log('SW_update', evt);
    store.dispatch(versionActions.update(evt));
  },
});
