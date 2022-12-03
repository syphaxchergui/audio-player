import React, { useEffect, useState, useCallback } from 'react';
import { toaster, Notification } from 'rsuite';
const initialState = {
  notifications: [],
  loadings: [],
};

const NotificationContext = React.createContext(initialState);
const CLOSE_DELAY = 15000;

export default function NotificationProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [notificationId, setNotificationId] = useState(1);
  const [loadingId, setLoadingId] = useState(1);

  const closeNotification = (id) => {
    const notifs = state.notifications.filter((item) => item.id !== id);
    setState({ ...state, notifications: notifs });
  };

  const createNotification = ({ type, show, message, autoClose }) => {
    const notifs = state.notifications;
    notifs.push({ type, show, message, id: notificationId });
    setState({ ...state, notifications: notifs });
    setNotificationId(notificationId + 1);
  };

  const toggleNotification = (id) => {
    const notifs = state.notifications;
    notifs.forEach((notif) => {
      if (notif.id === id) notif.show = !notif.show;
    });
    setState({ ...state, notifications: notifs });
  };

  //specific actions :
  // actions
  const success = (content, placement = 'topEnd') => {
    try {
      return toaster.push(
        <Notification type="success" header="Success" closable>
          {content}
        </Notification>,
        {
          placement: placement,
        },
      );
    } catch (error) {}
  };
  const warn = (content, placement = 'topEnd') => {
    try {
      return toaster.push(
        <Notification type="warning" header="Warning" closable>
          {content}
        </Notification>,
        {
          placement: placement,
        },
      );
    } catch (error) {}
  };
  const error = (content, placement = 'topEnd') => {
    try {
      return toaster.push(
        <Notification type="error" header="Error" closable>
          {content}
        </Notification>,
        {
          placement: placement,
        },
      );
    } catch (err) {}
  };
  const info = (content, placement = 'topEnd') => {
    try {
      return toaster.push(
        <Notification type="info" header="Info" closable>
          {content}
        </Notification>,
        {
          placement: placement,
        },
      );
    } catch (error) {}
  };
  // const error = (errorText, autoClose = true) =>
  //   createNotification({ type: 'error', show: true, message: errorText, autoClose });
  // const warn = (warnText, autoClose = true) =>
  //   createNotification({ type: 'warn', show: true, message: warnText, autoClose });
  // const info = (infoText, autoClose = true) =>
  //   createNotification({ type: 'info', show: true, message: infoText, autoClose });
  // const success = (successText, autoClose = true) =>
  //   createNotification({ type: 'success', show: true, message: successText, autoClose });

  const startLoading = ({ message }) => {
    const loadings = state.loadings;
    const id = loadingId;
    loadings.push({ id: loadingId, message });
    setLoadingId(loadingId + 1);
    setState({ ...state, loadings });
    return id;
  };
  const stopLoading = (id) => {
    const loadings = state.loadings.filter((item) => item.id !== id);
    setState((old) => ({ ...old, loadings: loadings }));
  };

  return (
    <NotificationContext.Provider
      value={{
        ...state,
        actions: {
          createNotification,
          toggleNotification,
          error,
          warn,
          info,
          success,
          closeNotification,
          startLoading,
          stopLoading,
        },
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => React.useContext(NotificationContext);
