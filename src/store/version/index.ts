import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';

type State = {
  serviceWorkerInitialized: boolean;
  serviceWorkerUpdated: boolean;
  serviceWorkerRegistration: ServiceWorkerRegistration | null;
};

const DEFAULT_STATE: State = {
  serviceWorkerInitialized: false,
  serviceWorkerUpdated: false,
  serviceWorkerRegistration: null,
};

class VersionReducer extends ImmerReducer<State> {
  init() {
    this.draftState.serviceWorkerInitialized = true;
  }
  update(registration: ServiceWorkerRegistration) {
    this.draftState.serviceWorkerRegistration = registration;
    this.draftState.serviceWorkerUpdated = true;
  }
}

export const versionActions = createActionCreators(VersionReducer);
export const versionReducer = createReducerFunction(
  VersionReducer,
  DEFAULT_STATE,
);
