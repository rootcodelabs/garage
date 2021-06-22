import { axiosConfig, getErrorMessage, getDeviceInfo } from '../../utils';

import { API_URL } from '../../constance';
import { LatestCallLogType, PermissionModalType } from './reducers';
import { RootState } from '../rootReducer';
import axios from 'axios';
import { getDeviceId } from 'react-native-device-info';
import { setCurrentCallStatus, setCallAnswered } from '../app/actions';

const PREFIX = '@CALL';

export const CLEAR_CALL_LOG_ERRORS = PREFIX + 'CLEAR_CALL_LOG_ERRORS';

export const END_CALL = PREFIX + 'END_CALL';
export const END_CALL_SUCCESS = PREFIX + 'END_CALL_SUCCESS';
export const END_CALL_FAILED = PREFIX + 'END_CALL_FAILED';

export const STAR_CALL = PREFIX + 'STAR_CALL';
export const START_CALL_SUCCESS = PREFIX + 'START_CALL_SUCCESS';
export const STAR_CALL_FAILED = PREFIX + 'STAR_CALL_FAILED';

export const UPDATE_CALL_STATUS = PREFIX + 'UPDATE_CALL_STATUS';
export const UPDATE_CALL_STATUS_SUCCESS = PREFIX + 'UPDATE_CALL_STATUS_SUCCESS';
export const UPDATE_CALL_STATUS_FAILED = PREFIX + 'UPDATE_CALL_STATUS_FAILED';

export const GET_LATEST_CALL_STATUS = PREFIX + 'GET_LATEST_CALL_STATUS';
export const GET_LATEST_CALL_STATUS_SUCCESS = PREFIX + 'GET_LATEST_CALL_STATUS_SUCCESS';
export const GET_LATEST_CALL_STATUS_FAILED = PREFIX + 'GET_LATEST_CALL_STATUS_FAILED';

export const DEVICE_READY_FOR_NEW_CALL = PREFIX + 'DEVICE_READY_FOR_NEW_CALL';
export const DEVICE_READY_FOR_NEW_CALL_SUCCESS = PREFIX + 'DEVICE_READY_FOR_NEW_CALL_SUCCESS';
export const DEVICE_READY_FOR_NEW_CALL_FAILED = PREFIX + 'DEVICE_READY_FOR_NEW_CALL_FAILED';

export const GET_CALL_LOGS = PREFIX + 'GET_CALL_LOGS';
export const GET_CALL_LOGS_SUCCESS = PREFIX + 'GET_CALL_LOGS_SUCCESS';
export const GET_CALL_LOGS_FAILED = PREFIX + 'GET_CALL_LOGS_FAILED';

export const SET_SHOW_PERMISSION_MODAL = PREFIX + 'SET_SHOW_PERMISSION_MODAL';

export const clearErrorLogs = () => async (dispatch: any) => {
  dispatch({ type: CLEAR_CALL_LOG_ERRORS });
};

export const showPermissionModal = (permission: PermissionModalType) => (dispatch: any) => {
  dispatch({ type: SET_SHOW_PERMISSION_MODAL, payload: permission });
};
export const hidePermissionModal = () => (dispatch: any) => {
  dispatch({ type: SET_SHOW_PERMISSION_MODAL, payload: null });
};

export const getLatestCallStatus = (userTokenType: 'expertAccessToken' | 'customerAccessToken') => async (
  dispatch: any,
) => {
  try {
    dispatch({ type: GET_LATEST_CALL_STATUS });
    const config = await axiosConfig(userTokenType);
    const response = await axios.get(`${API_URL}/call-logs/latest`, config);
    dispatch({ type: GET_LATEST_CALL_STATUS_SUCCESS, payload: response.data });

    const lastCallLog: LatestCallLogType = response.data;

    if (userTokenType === 'customerAccessToken') {
      if (lastCallLog) {
        if (lastCallLog.status === 'CALLING') {
          dispatch(setCurrentCallStatus(lastCallLog, 'incomming'));
        }
      } else {
        dispatch(setCurrentCallStatus(null, null));
      }
    }
  } catch (error) {
    dispatch({ type: GET_LATEST_CALL_STATUS_FAILED, payload: getErrorMessage(error) });
  }
};

export const postDeviceReadyForNewCall = () => async (dispatch: any, getState: any) => {
  try {
    const state: RootState = getState();
    if (!state.profile.isExpert) {
      return null;
    }
    dispatch({ type: DEVICE_READY_FOR_NEW_CALL });

    const config = await axiosConfig('expertAccessToken');
    const deviceId = getDeviceId();
    const response = await axios.post(
      `${API_URL}/call-logs/status-update?deviceId=${deviceId}&isIdle=true`,
      {},
      config,
    );
    dispatch({ type: DEVICE_READY_FOR_NEW_CALL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: DEVICE_READY_FOR_NEW_CALL_FAILED, payload: getErrorMessage(error) });
  }
};

export const startCallLog = (bookingId: string | number) => async (dispatch: any) => {
  try {
    dispatch({ type: STAR_CALL });
    const config = await axiosConfig('expertAccessToken');
    const response = await axios.post(
      `${API_URL}/bookings/${bookingId}/call-logs`,
      {
        deviceId: getDeviceId(),
        appVersion: getDeviceInfo(),
      },
      config,
    );
    dispatch({ type: START_CALL_SUCCESS, payload: response.data });
    dispatch(setCurrentCallStatus(response.data, 'outgoing'));
  } catch (error) {
    dispatch({ type: STAR_CALL_FAILED, payload: getErrorMessage(error) });
  }
};

export const updateCallStatus = (
  status: 'CALL_ANSWERED' | 'CALL_REJECTED' | 'CALL_CUT_BEFORE_ANSWER' | 'CALL_ENDED' | 'ENDED_BY_APP',
) => async (dispatch: any, getState: any) => {
  try {
    const state: RootState = getState();
    const { currentCallType, currentCall } = state.app;
    if (!currentCall) {
      return null;
    }
    dispatch({ type: UPDATE_CALL_STATUS });

    const userTokenType = currentCallType === 'incomming' ? 'customerAccessToken' : 'expertAccessToken';
    const config = await axiosConfig(userTokenType);
    const response = await axios.put(
      `${API_URL}/bookings/${currentCall.bookingId}/call-logs/${currentCall.callLogId}`,
      {
        status,
        deviceId: getDeviceId(),
        appVersion: getDeviceInfo(),
      },
      config,
    );

    dispatch({ type: UPDATE_CALL_STATUS_SUCCESS, payload: response.data });
    if (status === 'CALL_ENDED') {
      dispatch(getCallLogs(currentCall.bookingId));
      dispatch(setCallAnswered(false));
    }
    if (['CALL_REJECTED', 'CALL_CUT_BEFORE_ANSWER', 'CALL_ENDED', 'ENDED_BY_APP'].indexOf(status) > -1) {
      dispatch(setCurrentCallStatus(null, null));
      dispatch(setCallAnswered(false));
    }
  } catch (error) {
    dispatch(setCurrentCallStatus(null, null));
    dispatch({ type: UPDATE_CALL_STATUS_FAILED, payload: getErrorMessage(error) });
  }
};

export const stopCallLog = (bookingId: string | number, lastCallId: string, endTimeMillis: number) => async (
  dispatch: any,
) => {
  try {
    dispatch({ type: END_CALL });
    const config = await axiosConfig('expertAccessToken');
    const response = await axios.put(
      `${API_URL}/bookings/${bookingId}/call-logs/${lastCallId}`,
      {
        endTimeMillis: endTimeMillis || 1,
      },
      config,
    );
    dispatch({ type: END_CALL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: END_CALL_FAILED, payload: getErrorMessage(error) });
  }
};

export const getCallLogs = (bookingId: string) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_CALL_LOGS });
    const config = await axiosConfig('expertAccessToken');
    const response = await axios.get(`${API_URL}/bookings/${bookingId}/call-logs`, config);

    dispatch({ type: GET_CALL_LOGS_SUCCESS, payload: response.data.callLogs });
  } catch (error) {
    dispatch({ type: GET_CALL_LOGS_FAILED, payload: getErrorMessage(error) });
  }
};
