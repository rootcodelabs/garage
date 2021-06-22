import {
  GET_PUSH_NOTIFICATIONS,
  GET_PUSH_NOTIFICATIONS_SUCCESS,
  GET_PUSH_NOTIFICATIONS_FAILED,
  UPDATE_PUSH_NOTIFICATIONS,
  UPDATE_PUSH_NOTIFICATIONS_SUCCESS,
  UPDATE_PUSH_NOTIFICATIONS_FAILED,
  DELETE_PUSH_NOTIFICATIONS,
  DELETE_PUSH_NOTIFICATIONS_SUCCESS,
  DELETE_PUSH_NOTIFICATIONS_FAILED,
} from './actions';
import { MyProfileType } from '../profile/reducers';

export interface payloadType {
  data: {
    type: string;
    bookingId: string;
    serviceId: string;
    customerName: string;
    serviceTitle: string;
    customerProfilePic: string;
  };
  notification: {
    body: string;
    title: string;
  };
}

export interface NotificationType {
  id: string;
  status: 'READ' | 'UNREAD';
  payload: payloadType;
  ttlMs: number;
  user: MyProfileType;
  createdDate: string;
}

export interface PushNotificationType {
  notifications: NotificationType[];
  unreadCount: number;
}

export interface PushNotificationInitialState {
  isLoading: boolean;
  pushNotificationsErrors: string | null;
  pushNotificationsUpdateSuccessMessage: string | null;
  pushNotificationsDeleteSuccessMessage: string | null;
  pushNotifications: PushNotificationType | null;
}

export const initialState: PushNotificationInitialState = {
  isLoading: false,
  pushNotificationsErrors: null,
  pushNotificationsUpdateSuccessMessage: null,
  pushNotificationsDeleteSuccessMessage: null,
  pushNotifications: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_PUSH_NOTIFICATIONS:
      return { ...state, isLoading: true, pushNotificationsErrors: null };
    case GET_PUSH_NOTIFICATIONS_SUCCESS:
      return { ...state, isLoading: false, pushNotifications: action.payload };
    case GET_PUSH_NOTIFICATIONS_FAILED:
      return { ...state, isLoading: false, pushNotificationsErrors: action.payload };

    case UPDATE_PUSH_NOTIFICATIONS:
      return { ...state, isLoading: true, pushNotificationsErrors: null, pushNotificationsUpdateSuccessMessage: null };
    case UPDATE_PUSH_NOTIFICATIONS_SUCCESS:
      return { ...state, isLoading: false, pushNotificationsUpdateSuccessMessage: action.payload };
    case UPDATE_PUSH_NOTIFICATIONS_FAILED:
      return { ...state, isLoading: false, pushNotificationsErrors: action.payload };

    case DELETE_PUSH_NOTIFICATIONS:
      return { ...state, isLoading: true, pushNotificationsErrors: null, pushNotificationsDeleteSuccessMessage: null };
    case DELETE_PUSH_NOTIFICATIONS_SUCCESS:
      return { ...state, isLoading: false, pushNotificationsDeleteSuccessMessage: action.payload };
    case DELETE_PUSH_NOTIFICATIONS_FAILED:
      return { ...state, isLoading: false, pushNotificationsErrors: action.payload };

    default:
      return state;
  }
};

export default authReducer;
