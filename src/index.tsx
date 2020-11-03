import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from 'store/configureStore';
import { theme } from 'styles';

import './index.css';
import MainRoute from 'routes';

import * as serviceWorker from './serviceWorker';

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

render(MainRoute);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
