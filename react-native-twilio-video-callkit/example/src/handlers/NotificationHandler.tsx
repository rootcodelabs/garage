import { GetNotificationMessage, getNotificationMessage, handleOnTapNavigationInApp, logger } from '../utils';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
  clearCustomerCompletedBookings,
  clearCustomerUpcomingBookings,
  clearExpertUpcomingBookings,
  getCustomerCompletedBookings,
  getCustomerPendingBookings,
  getCustomerUpcomingBookings,
  getExpertPendingBookings,
  getExpertUpcomingBookings,
  getNotifications,
  handleIncommingNotification,
  setUserViewType,
} from '../redux/rootActions';
// import { isMountedRef, navigate } from './RootNavigation';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';

import { NOTIFICATION_TYPES } from '../constance';

import { RootState } from '../redux/rootReducer';

import { handleCallDecline } from '../../index';

const NotificationHandler = () => {
  const dispatch = useDispatch();
  const [inappMessage, setInAppMessage] = useState<GetNotificationMessage | null>();
  const [inappMessageObject, setInAppMessageObject] = useState<FirebaseMessagingTypes.RemoteMessage | null>(null);
  const isInExpertView = useSelector((state: RootState) => state.app.isInExpertView);
  const pushNotifications = useSelector((state: RootState) => state.pushNotification.pushNotifications);

  const handlingNotificationDispaches = useCallback(
    async remoteMessage => {
      const notificationResponse = await getNotificationMessage(remoteMessage);
      if (notificationResponse) {
      }
    },
    [dispatch],
  );
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
     
      logger.debug('onMessage', remoteMessage);
      dispatch(handleIncommingNotification(remoteMessage, null, false));
      dispatch(getNotifications());
      handlingNotificationDispaches(remoteMessage);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      dispatch(handleIncommingNotification(remoteMessage, null, true));
      handlingNotificationDispaches(remoteMessage);
    });
  }, []);


  
  return (
    <View >
      <Text>Test</Text>
  </View>
  );
};

export default NotificationHandler;
