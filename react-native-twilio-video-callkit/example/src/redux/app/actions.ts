import * as Sentry from '@sentry/react-native';

import { SENTRY_DNS, SENTRY_URL, API_URL } from '../../constance';
import {
  getErrorMessage,
  isNotExpiredTimeFromNow,
  isThisOlderVersion,
  isLatestAppVersion,
  axiosConfig,
  getCurrentUserId,
  getCurrentEmail,
  getTypeAndValueFromUrl,
  setInvitedDownloadStatus,
  getInvitedDownloadStatus,
  getUniqueDeviceId,
  logger,
  isAuthenticated,
  ga,
} from '../../utils';

import { LatestCallLogType } from '../callLogs/reducers';
import { RootState } from '../rootReducer';
import axios from 'axios';
// import { getProfile } from '../profile/actions';
// import { getCurrencies, getExchangeRates } from '../currency/actions';
// import { NoSignInType } from './reducers';
// import { getAllFeatureFlags } from '../featureFlag/actions';

const PREFIX = '@APP_';

export const APP = PREFIX + 'APP';

export const APP_SET_USER_TYPE = PREFIX + 'SET_USER_TYPE';

export const GET_TWILLIO_VIDEO_TOKEN = PREFIX + 'GET_TWILLIO_VIDEO_TOKEN';
export const GET_TWILLIO_VIDEO_TOKEN_FAILED = PREFIX + 'GET_TWILLIO_VIDEO_TOKEN_FAILED';
export const GET_TWILLIO_VIDEO_TOKEN_SUCCESS = PREFIX + 'GET_TWILLIO_VIDEO_TOKEN_SUCCESS';

export const GET_HOME = PREFIX + 'GET_HOME';
export const GET_HOME_FAILED = PREFIX + 'GET_HOME_FAILED';
export const GET_HOME_SUCCESS = PREFIX + 'GET_HOME_SUCCESS';


export const SET_CALL_STATUS = PREFIX + 'SET_CALL_STATUS';
export const SET_CALL_STATUS_TYPE = PREFIX + 'SET_CALL_STATUS_TYPE';
export const SET_SHOW_SIGN_IN_MODAL = PREFIX + 'SET_SHOW_SIGN_IN_MODAL';

export const GET_LATEST_INFO = PREFIX + 'GET_LATEST_INFO';
export const GET_LATEST_INFO_FAILED = PREFIX + 'GET_LATEST_INFO_FAILED';
export const GET_LATEST_INFO_SUCCESS = PREFIX + 'GET_LATEST_INFO_SUCCESS';

export const SET_REMOTE_MESSAGES = PREFIX + 'SET_REMOTE_MESSAGES';

export const SET_CALL_ANSWERED = PREFIX + 'SET_CALL_ANSWERED';

export const getLatestInfo = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_LATEST_INFO });
    const response = await axios.get(`${API_URL}/app-info/latest`);
    if (response.data) {
      const { minVersionIOS, minVersionAndroid, latestVersionIOS, latestVersionAndroid } = response.data;
      dispatch({
        type: GET_LATEST_INFO_SUCCESS,
        payload: {
          latestAppInfo: response.data,
          isAppOld: isThisOlderVersion(minVersionIOS, minVersionAndroid),
          isLatestVersion: isLatestAppVersion(latestVersionIOS, latestVersionAndroid),
        },
      });
    } else {
      dispatch({ type: GET_LATEST_INFO_FAILED });
    }
  } catch (error) {
    dispatch({ type: GET_LATEST_INFO_FAILED });
  }
};

export const getTwillioVideoToken = () => async (dispatch: any, getState: any): Promise<string | null> => {
  try {
    const currentUserId = getCurrentUserId();
    if (!currentUserId) {
      return null;
    }
    const store: RootState = getState();
    const { twillioVideoToken, twillioVideoExpire } = store.app;
    if (twillioVideoToken && twillioVideoExpire && isNotExpiredTimeFromNow(twillioVideoExpire)) {
      return twillioVideoToken;
    }

    dispatch({ type: GET_TWILLIO_VIDEO_TOKEN });
    const response = await axios.get(`${API_URL}/video/token?identity=${currentUserId}`);
    const { token, expireIn } = response.data;
    dispatch({
      type: GET_TWILLIO_VIDEO_TOKEN_SUCCESS,
      payload: {
        twillioVideoToken: token,
        twillioVideoExpire: expireIn,
      },
    });
    dispatch(getLatestInfo());
    return token;
  } catch (error) {
    dispatch({ type: GET_TWILLIO_VIDEO_TOKEN_FAILED, payload: getErrorMessage(error) });
    return null;
  }
};



export const setUserViewType = (userType: 'customer' | 'expert' | 'owner') => (dispatch: any) => {
  const payload = {
    isInExpertView: false,
  };
  if (userType !== 'customer') {
    payload.isInExpertView = true;
  }
  dispatch({ type: APP_SET_USER_TYPE, payload });
};


export const appRegularCheck = () => async (dispatch: any, getState: any) => {
  try {
    dispatch(getTwillioVideoToken());
   
    const store: RootState = getState();
 
  } catch (error) {
    console.log('appRegularCheck error', error);
  }
};

export const setCurrentCallStatus = (callStatus: LatestCallLogType | null, type: 'incomming' | 'outgoing' | null) => (
  dispatch: any,
) => {
  dispatch({ type: SET_CALL_STATUS, payload: callStatus });
  dispatch({ type: SET_CALL_STATUS_TYPE, payload: type });
};

export const setCallAnswered = (value: boolean) => (dispatch: any) => {
  dispatch({ type: SET_CALL_ANSWERED, payload: value });
};


export const setRemoteMessages = (value: boolean) => (dispatch: any) => {
  dispatch({ type: SET_REMOTE_MESSAGES, payload: value });
};
