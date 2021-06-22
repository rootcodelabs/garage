import {
  CLEAR_CALL_LOG_ERRORS,
  DEVICE_READY_FOR_NEW_CALL,
  DEVICE_READY_FOR_NEW_CALL_FAILED,
  DEVICE_READY_FOR_NEW_CALL_SUCCESS,
  END_CALL,
  END_CALL_FAILED,
  END_CALL_SUCCESS,
  GET_LATEST_CALL_STATUS,
  GET_LATEST_CALL_STATUS_FAILED,
  GET_LATEST_CALL_STATUS_SUCCESS,
  START_CALL_SUCCESS,
  STAR_CALL,
  STAR_CALL_FAILED,
  GET_CALL_LOGS,
  GET_CALL_LOGS_SUCCESS,
  GET_CALL_LOGS_FAILED,
  SET_SHOW_PERMISSION_MODAL,
} from './actions';

import { CALL_LOG_STATUS_ENUM } from '../../constance';

export interface LangType {
  language: string;
  proficiency: string;
}

export interface ProfileType {
  languages: LangType[] | undefined;
  userId: string;
  name: string;
  phoneNumber: string;
  occupation: string;
  bio: string;
  profilePic: string;
  online: boolean;
  country: string;
  creditBalance: number;
}

export interface CallLogBooking extends ProfileType {
  customer: ProfileType;
  expert: ProfileType;
}

export type PermissionModalType =
  | 'BOTH_DENIED'
  | 'CAMERA_BLOCKED'
  | 'RADIO_BLOCKED'
  | 'BOTH_BLOCKED'
  | 'MEDIA_DENIED'
  | 'MEDIA_BLOCKED'
  | null;

export interface CallLogType {
  callLogId: string;
  from: string;
  to: string;
  callEndedBy: null | string;
  status: CALL_LOG_STATUS_ENUM;
  fromDeviceId: null | string;
  toDeviceId: null | string;
  fromAppVersion: null | string;
  toAppVersion: null | string;
  startTime: string;
  endTime: null | string;
  bookingId: string;
  permissionModal: PermissionModalType;
}

export interface LatestCallLogType {
  callLogId: string;
  from: string;
  to: string;
  callEndedBy: null | string;
  status: CALL_LOG_STATUS_ENUM;
  fromDeviceId: null | string;
  toDeviceId: null | string;
  fromAppVersion: null | string;
  toAppVersion: null | string;
  startTime: string;
  endTime: null | string;
  bookingId: string;
  booking: CallLogBooking;
  permissionModal: PermissionModalType;
}
export interface CallLogInitialState {
  lastCallLogId?: string | null;
  callLogLoading: boolean;
  callLogError?: string | null;

  latestCallLog: null | LatestCallLogType;
  latestCallLogLoading: boolean;
  latestCallLogError?: string | null;

  deviceReadyForNewCallLoading: boolean;
  deviceReadyForNewCallError: string | null;

  callLogs: CallLogType[];
  callLogsLoading: boolean;
  callLogsErrors: string | null;
  permissionModal: PermissionModalType;
}

export const initialState: CallLogInitialState = {
  lastCallLogId: null,
  callLogLoading: false,
  callLogError: null,

  latestCallLog: null,
  latestCallLogLoading: false,
  latestCallLogError: null,

  deviceReadyForNewCallLoading: false,
  deviceReadyForNewCallError: null,

  callLogs: [],
  callLogsLoading: false,
  callLogsErrors: null,
  permissionModal: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CLEAR_CALL_LOG_ERRORS:
      return { ...state, latestCallLogError: null, callLogError: null };
    case END_CALL:
      return { ...state, callLogError: null };
    case END_CALL_FAILED:
      return { ...state, callLogError: action.payload };
    case END_CALL_SUCCESS:
      return { ...state };

    case STAR_CALL:
      return { ...state, callLogLoading: true, callLogError: null };
    case STAR_CALL_FAILED:
      return { ...state, callLogLoading: false, callLogError: action.payload };
    case START_CALL_SUCCESS:
      return { ...state, callLogLoading: false };

    case GET_LATEST_CALL_STATUS:
      return { ...state, latestCallLogLoading: true, latestCallLogError: null };
    case GET_LATEST_CALL_STATUS_FAILED:
      return { ...state, latestCallLogLoading: false, latestCallLogError: action.payload };
    case GET_LATEST_CALL_STATUS_SUCCESS:
      return { ...state, latestCallLogLoading: false, latestCallLog: action.payload };

    case DEVICE_READY_FOR_NEW_CALL:
      return { ...state, deviceReadyForNewCallLoading: true, deviceReadyForNewCallError: null };
    case DEVICE_READY_FOR_NEW_CALL_FAILED:
      return { ...state, deviceReadyForNewCallLoading: false, deviceReadyForNewCallError: action.payload };
    case DEVICE_READY_FOR_NEW_CALL_SUCCESS:
      return { ...state, deviceReadyForNewCallLoading: false };

    case GET_CALL_LOGS:
      return { ...state, callLogsLoading: true, callLogsErrors: null };
    case GET_CALL_LOGS_SUCCESS:
      return { ...state, callLogsLoading: false, callLogs: action.payload };
    case GET_CALL_LOGS_FAILED:
      return { ...state, callLogsLoading: false, callLogsErrors: action.payload };
    case SET_SHOW_PERMISSION_MODAL:
      return { ...state, permissionModal: action.payload };

    default:
      return state;
  }
};

export default authReducer;
