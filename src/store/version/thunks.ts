import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store';
import { AnyAction } from 'redux';

const updateApp = (): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> => (dispatch, getState) => {
  const {
    version: { serviceWorkerRegistration },
  } = getState();

  const registrationWaiting = serviceWorkerRegistration?.waiting;

  if (registrationWaiting) {
    registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
    registrationWaiting.addEventListener('statechange', (e: any) => {
      if (e.target?.state === 'activated') {
        window.location.reload();
      }
    });
  }

  return Promise.resolve();
};

export default {
  updateApp,
};
