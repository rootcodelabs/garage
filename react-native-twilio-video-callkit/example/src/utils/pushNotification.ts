import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { NOTIFICATION_TYPES } from '../constance';
// import { currentRouterNameRef } from '../uiHandlers/RootNavigation';
import { isAuthenticated } from './auth';
import { setUserViewType } from '../redux/rootActions';
import { store } from '../App';

// export async function requestUserPermission() {
//   try {
//     const settings = await messaging().requestPermission();
//     messaging().setAutoInitEnabled(true);
//     if (settings) {
//       console.log('Permission settings:', settings);
//     }
//     return settings;
//   } catch (error) {
//     console.log('error requestUserPermission', error);
//   }
// }

export async function checkUserPermission() {
  try {
    const authorizationStatus = await messaging().requestPermission();
    return authorizationStatus;
  } catch (error) {
    console.log('error checkUserPermission', error);
  }
}

export async function getDeviceTokenForPushNotification() {
  try {
    const response = await messaging().getToken();
    return response;
  } catch (error) {
    console.log('registerAppWithFCM error', error);
    return null;
  }
}

export async function handleOnTapNavigationInApp(remoteMessage: FirebaseMessagingTypes.RemoteMessage, navigate: any) {
  try {
    if (!isAuthenticated()) {
      return null;
    }
    if (remoteMessage.data) {
      const { type } = remoteMessage.data;

      if (type === NOTIFICATION_TYPES.session_completed) {
        const { bookingId } = remoteMessage.data;
        navigate('BookingRatingScreen', {
          bookingId,
        });
      } else if (type === NOTIFICATION_TYPES.new_booking) {
        store.dispatch(setUserViewType('expert'));
        navigate('PendingBookingsScreen');
      } else if (type === NOTIFICATION_TYPES.new_message) {
        const { channelName, name, profilePic, chatWithUserId } = remoteMessage.data;
        navigate('ChatMessagesScreen', {
          uniqueName: channelName,
          name: name,
          image: profilePic,
          chatWithUserId: chatWithUserId,
        });
      } else if (type === NOTIFICATION_TYPES.before_booking_auto_rejected) {
        store.dispatch(setUserViewType('expert'));
        navigate('PendingBookingsScreen');
      } else if (type === NOTIFICATION_TYPES.before_booking_start_alert) {
        const { bookingId } = remoteMessage.data;
        store.dispatch(setUserViewType('expert'));
        navigate('BookingTimerScreen', {
          bookingId,
        });
      } else if (type === NOTIFICATION_TYPES.booking_accepted) {
        store.dispatch(setUserViewType('customer'));
        navigate('MyBookingScreen');
      } else if (type === NOTIFICATION_TYPES.booking_rejected) {
        const { bookingId } = remoteMessage.data;
        navigate('CustomerBookingRejectedScreen', {
          bookingId,
        });
      }
    }
    return null;
  } catch (error) {
    console.log('registerAppWithFCM error', error);
    return null;
  }
}

export function getNotificationType(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
  if (remoteMessage.data) {
    return remoteMessage.data.type;
  }
  return null;
}

export interface GetNotificationMessage {
  title?: string;
  body?: string;
  type: string;
}
export async function getNotificationMessage(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): Promise<GetNotificationMessage | null> {
  // const currentRoute = currentRouterNameRef.current;
  if (!isAuthenticated()) {
    return null;
  }
  try {
    if (remoteMessage.data && remoteMessage.notification) {
      const { type } = remoteMessage.data;
      const { title, body } = remoteMessage.notification;
      if (type === NOTIFICATION_TYPES.added_to_new_service) {
        return {
          type,
          title,
          body,
        };
      }
      if (type === NOTIFICATION_TYPES.session_completed) {
        return {
          type,
          title,
          body,
        };
      }
      if (type === NOTIFICATION_TYPES.new_booking) {
        return {
          type,
          title,
          body,
        };
      }
      if (type === NOTIFICATION_TYPES.booking_accepted) {
        return {
          type,
          title,
          body,
        };
      }
      if (type === NOTIFICATION_TYPES.booking_rejected) {
        return {
          type,
          title,
          body,
        };
      }
     
    }
    return null;
  } catch (error) {
    console.log('registerAppWithFCM error', error);
    return null;
  }
}
