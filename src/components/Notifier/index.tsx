import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarKey, useSnackbar } from 'notistack';
import { RootState } from 'store';
import { notificationActions } from 'store/notification';

let displayed: SnackbarKey[] = [];

const Notifier = (): null => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    ({ notification: { notifications } }: RootState) => notifications || [],
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            // remove this snackbar from redux store
            dispatch(notificationActions.removeNotification(myKey));
            removeDisplayed(myKey);
          },
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      },
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;
