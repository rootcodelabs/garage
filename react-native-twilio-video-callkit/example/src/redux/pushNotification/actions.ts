import { API_URL, NOTIFICATION_TYPES } from '../../constance';
import {
  axiosConfig,
  getDeviceInfo,
  getUniqueDeviceId,
  getDeviceTokenForPushNotification,
  getNotificationType,
  handleOnTapNavigationInApp,
  getErrorMessage,
  isAuthenticated,
  logger,
  isExpertOrOwner,
} from '../../utils';

import { BookingType } from '../booking/reducers';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { RootState } from '../rootReducer';
import axios from 'axios';
import { getLatestCallStatus } from '../callLogs/actions';
import { setCurrentCallStatus } from '../app/actions';
import { clearExpertUpcomingBookings, getExpertUpcomingBookings } from '../booking/actions';

const PREFIX = '@PUSH_NOTIFICATIONS_';

export const GET_PUSH_NOTIFICATIONS = PREFIX + 'GET_PUSH_NOTIFICATIONS';
export const GET_PUSH_NOTIFICATIONS_SUCCESS = PREFIX + 'GET_PUSH_NOTIFICATIONS_SUCCESS';
export const GET_PUSH_NOTIFICATIONS_FAILED = PREFIX + 'GET_PUSH_NOTIFICATIONS_FAILED';

export const UPDATE_PUSH_NOTIFICATIONS = PREFIX + 'UPDATE_PUSH_NOTIFICATIONS';
export const UPDATE_PUSH_NOTIFICATIONS_SUCCESS = PREFIX + 'UPDATE_PUSH_NOTIFICATIONS_SUCCESS';
export const UPDATE_PUSH_NOTIFICATIONS_FAILED = PREFIX + 'UPDATE_PUSH_NOTIFICATIONS_FAILED';

export const DELETE_PUSH_NOTIFICATIONS = PREFIX + 'DELETE_PUSH_NOTIFICATIONS';
export const DELETE_PUSH_NOTIFICATIONS_SUCCESS = PREFIX + 'DELETE_PUSH_NOTIFICATIONS_SUCCESS';
export const DELETE_PUSH_NOTIFICATIONS_FAILED = PREFIX + 'DELETE_PUSH_NOTIFICATIONS_FAILED';

export const registerTokenForPushNotification = () => async () => {
  try {
    if (!isAuthenticated()) {
      return null;
    }

    const pushToken = await getDeviceTokenForPushNotification();
    const deviceUniqId = getUniqueDeviceId();
    const deviceInfo = getDeviceInfo();

    const config = await axiosConfig('customerAccessToken');
    await axios.put(`${API_URL}/push-notifications/token`, { pushToken, deviceInfo, deviceUniqId }, config);
  } catch (error) {
    console.log('registerTokenForPushNotification', getErrorMessage(error));
  }
};

export const deletePushNotification = () => async () => {
  try {
    const config = await axiosConfig('customerAccessToken');
    const deviceUniqId = getUniqueDeviceId();
    await axios.delete(`${API_URL}/push-notifications/token/${deviceUniqId}`, config);
  } catch (error) {
    logger.error('deletePushNotification', 'cannot delete push notification');
  }
};

export const startBookingCallPushAsExpert = (booking: BookingType) => async () => {
  try {
    const { customer, expert, service } = booking;
    if (customer && expert && service) {
      var ttl = new Date();
      ttl.setMinutes(ttl.getMinutes() + 1);
      const config = await axiosConfig('expertAccessToken');
      const body = {
        userId: `${customer.userId}`,
        notification: {
          title: `${expert.name} is calling now...`,
          body: `Regarding ${service.title} `,
        },
        data: {
          type: NOTIFICATION_TYPES.expert_calling,
          bookingId: `${booking.bookingId}`,
          serviceTitle: `${service.title}`,
          durationMinutes: `${service.durationMinutes}`,
          image: `${expert.profilePic}`,
          name: `${expert.name}`,
          userId: `${expert.userId}`,
          expireIn: ttl.getTime().toString(),
        },
        ttl: 60, // 1 min in seconds
      };
      await axios.post(`${API_URL}/push-notifications/send`, body, config);
    }
  } catch (error) {
    console.log('startBookingCallPushAsExpert', getErrorMessage(error));
  }
};

export const cutCallPushNotification = (userId: string) => async () => {
  try {
    const config = await axiosConfig('customerAccessToken');
    var ttl = new Date();
    ttl.setMinutes(ttl.getMinutes() + 1);
    await axios.post(
      `${API_URL}/push-notifications/send`,
      {
        userId: `${userId}`,
        notification: {},
        data: {
          type: NOTIFICATION_TYPES.user_cut_call,
          userId: `${userId}`,
          expireIn: ttl.getTime().toString(),
        },
        ttl: 60, // 1 min in seconds
      },
      config,
    );
  } catch (error) {
    console.log('cutCallPushNotification', getErrorMessage(error));
  }
};

export const handleIncommingNotification = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  navigate: any,
  background: boolean,
) => async (dispatch: any, getState: any) => {
  if (!remoteMessage) {
    return null;
  }
  const { data } = remoteMessage;
  try {
    const messageType = getNotificationType(remoteMessage);
    if (messageType === NOTIFICATION_TYPES.user_cut_call) {
      dispatch(clearExpertUpcomingBookings());
      if (isExpertOrOwner()) {
        dispatch(getExpertUpcomingBookings());
      }
    }
    if (messageType === NOTIFICATION_TYPES.expert_calling) {
      dispatch(getLatestCallStatus('customerAccessToken'));
    } else if (messageType === NOTIFICATION_TYPES.user_cut_call) {
      const state: RootState = getState();
      const { currentCall } = state.app;
      if (currentCall && data && currentCall.callLogId === data.callLogId) {
        dispatch(setCurrentCallStatus(null, null));
      }
    } else if (background) {
      handleOnTapNavigationInApp(remoteMessage, navigate);
    }
  } catch (error) {
    console.log('handleIncommingNotification', getErrorMessage(error));
  }
};

export const getNotifications = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_PUSH_NOTIFICATIONS });
    const config = await axiosConfig('customerAccessToken');
    const response = await axios.get(`${API_URL}/push-notifications`, config);

    dispatch({ type: GET_PUSH_NOTIFICATIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PUSH_NOTIFICATIONS_FAILED, payload: getErrorMessage(error) });
  }
};

export const updateNotification = (notificationId: string) => async (dispatch: any) => {
  try {
    const config = await axiosConfig('customerAccessToken');
    await axios.put(
      `${API_URL}/push-notifications/${notificationId}`,
      {
        status: 'READ',
      },
      config,
    );
    dispatch({ type: UPDATE_PUSH_NOTIFICATIONS_SUCCESS, payload: 'Successfully Updated' });
  } catch (error) {
    dispatch({ type: UPDATE_PUSH_NOTIFICATIONS_FAILED, payload: getErrorMessage(error) });
  }
};

export const deleteNotification = (notificationId: string) => async (dispatch: any) => {
  try {
    dispatch({ type: DELETE_PUSH_NOTIFICATIONS });
    const config = await axiosConfig('customerAccessToken');
    await axios.delete(`${API_URL}/push-notifications/${notificationId}`, config);
    await dispatch(getNotifications());
    dispatch({ type: DELETE_PUSH_NOTIFICATIONS_SUCCESS, payload: 'Successfully Deleted' });
  } catch (error) {
    dispatch({ type: DELETE_PUSH_NOTIFICATIONS_FAILED, payload: getErrorMessage(error) });
  }
};

export const clearNotifications = () => async (dispatch: any) => {
  try {
    dispatch({ type: DELETE_PUSH_NOTIFICATIONS });
    const config = await axiosConfig('customerAccessToken');
    await axios.delete(`${API_URL}/push-notifications`, config);
    await dispatch(getNotifications());
    dispatch({ type: DELETE_PUSH_NOTIFICATIONS_SUCCESS, payload: 'Successfully Deleted' });
  } catch (error) {
    dispatch({ type: DELETE_PUSH_NOTIFICATIONS_FAILED, payload: getErrorMessage(error) });
  }
};
