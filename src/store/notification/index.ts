import { v1 as uuid } from 'uuid';
import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';
import { OptionsObject, SnackbarMessage, SnackbarKey } from 'notistack';

type Message = {
  key: SnackbarKey;
  message: SnackbarMessage;
  options: OptionsObject;
  dismissed?: boolean;
};

type State = {
  notifications: Message[];
};

const DEFAULT_STATE: State = {
  notifications: [],
};

class NotificationReducer extends ImmerReducer<State> {
  addNotification(
    message: SnackbarMessage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { key, defaultValue, ...options }: OptionsObject,
  ) {
    this.draftState.notifications.push({
      key: key ?? uuid(),
      message,
      options,
    });
  }

  closeNotification(key: SnackbarKey) {
    this.draftState.notifications.forEach((notif) => {
      if (notif.key === key) {
        notif.dismissed = true;
      }
    });
  }

  removeNotification(keyToRemove: SnackbarKey) {
    this.draftState.notifications = this.draftState.notifications.filter(
      ({ key }) => key !== keyToRemove,
    );
  }
}

export const notificationActions = createActionCreators(NotificationReducer);
export const notificationReducer = createReducerFunction(
  NotificationReducer,
  DEFAULT_STATE,
);
