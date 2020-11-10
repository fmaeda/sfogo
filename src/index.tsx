import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedComponent, Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from 'store/configureStore';
import { theme } from 'styles';

import './index.css';
import App from 'App';

const { store, persistor } = configureStore();

const render = (AppComponent: React.NamedExoticComponent) => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider maxSnack={3}>
            <AppComponent />
          </SnackbarProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement,
  );
};

render(App);
