import { deletePushNotification, registerTokenForPushNotification } from '../pushNotification/actions';

import { API_URL } from '../../constance';
import { AuthTokens, SignUpResponse } from './reducers';
import axios from 'axios';
import { getProfile } from '../profile/actions';
import {
  // shutdownChatClient,
  removeSentryUser,
  storageClearAll,
  getErrorMessage,
  storeAuthCreds,
  StoreAuthCredsType,
  // ga,
  getInvitedDownloadStatus,
  getUniqueDeviceId,
  removeInviterFromStorage,
  getCurrentEmail,
  // initChatConnectivity,
} from '../../utils';
// import { setAppInitCompleted } from '../app/actions';

export const PREFIX = '@AUTH_';
export const LOGOUT = PREFIX + 'LOGOUT';

export const LOGIN = PREFIX + 'LOGIN';
export const LOGIN_SUCCESS = PREFIX + 'LOGIN_SUCCESS';
export const LOGIN_FAILED = PREFIX + 'LOGIN_FAILED';

export const SHOULD_EMAIL_VERIFY = PREFIX + 'SHOULD_EMAIL_VERIFY';
export const SET_AUTH_TOKENS = PREFIX + 'SET_AUTH_TOKENS';

export const SIGNUP = PREFIX + 'SIGNUP';
export const SIGNUP_SUCCESS = PREFIX + 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = PREFIX + 'SIGNUP_FAILED';

export const FORGOT_PASSWORD = PREFIX + 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = PREFIX + 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = PREFIX + 'FORGOT_PASSWORD_FAILED';

export const RESEND_EMAIL = PREFIX + 'RESEND_EMAIL';
export const RESEND_EMAIL_SUCCESS = PREFIX + 'RESEND_EMAIL_SUCCESS';
export const RESEND_EMAIL_FAILED = PREFIX + 'RESEND_EMAIL_FAILED';

export const CLEAR_ERRORS = PREFIX + 'CLEAR_ERRORS';

interface signupBodyType {
  name: string;
  password: string;
  phoneNumber: string;
  email: string;
  referralCode?: string;
  deviceId?: string;
}

export const cleanAuthError = () => (dispatch: any) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const setAuthTokens = (authTokens: AuthTokens | null) => (dispatch: any) => {
  dispatch({ type: SET_AUTH_TOKENS, payload: authTokens });
};

export const afterAuthenticating = (creds: StoreAuthCredsType, isVerified: boolean) => async (dispatch: any) => {
  if (!isVerified) {
    dispatch({ type: SHOULD_EMAIL_VERIFY });
  }
  await storeAuthCreds(creds);
  await dispatch(getProfile(true));
  await dispatch(registerTokenForPushNotification());
  // await dispatch(initChatConnectivity());
  dispatch({ type: SET_AUTH_TOKENS, payload: creds });
  // ga.onceUserLogin();
  removeInviterFromStorage();
};

export const loginLocal = (email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch({ type: LOGIN });
    const response = await axios.post(`${API_URL}/auth/local/login`, {
      email: email.trim(),
      password,
    });

    dispatch(afterAuthenticating(response.data, response.data.isVerified));
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILED, payload: getErrorMessage(error) });
  }
};

export const signupLocal = (body: signupBodyType) => async (dispatch: any) => {
  try {
    dispatch({ type: SIGNUP });
    body.email = body.email.trim();

    const inviteDownloadStatus = await getInvitedDownloadStatus();
    const deviceId = await getUniqueDeviceId();
    if (inviteDownloadStatus && inviteDownloadStatus.status !== 'NONE') {
      body.referralCode = inviteDownloadStatus.invitedBy;
      body.deviceId = deviceId;
    }
    const response = await axios.post(`${API_URL}/auth/local/signup`, body);
    const signUpResponse: SignUpResponse = response.data;

    dispatch({ type: SIGNUP_SUCCESS, payload: signUpResponse });
    dispatch(afterAuthenticating(signUpResponse, signUpResponse.isVerified));
    dispatch({ type: SET_AUTH_TOKENS, payload: signUpResponse });
  } catch (error) {
    dispatch({ type: SIGNUP_FAILED, payload: getErrorMessage(error) });
  }
};

export const fogetPassword = (email: string) => async (dispatch: any) => {
  try {
    dispatch({ type: FORGOT_PASSWORD });
    await axios.post(`${API_URL}/auth/local/forgot-password-email`, { email: email.trim() });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: 'We have sent you a password reset email' });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAILED, payload: getErrorMessage(error) });
  }
};

export const resendEmailVerification = () => async (dispatch: any) => {
  try {
    const email = getCurrentEmail();
    if (!email) {
      return null;
    }
    dispatch({ type: RESEND_EMAIL });
    const response = await axios.post(`${API_URL}/auth/local/email-verification`, { email: email.trim() });
    dispatch({ type: RESEND_EMAIL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: RESEND_EMAIL_FAILED, payload: getErrorMessage(error) });
  }
};

/**
 * Do everything related to the logout
 */
export const logout = () => async (dispatch: any) => {
  try {
    dispatch({ type: LOGOUT });
    // dispatch(setAppInitCompleted());
    removeSentryUser();
    // dispatch(deletePushNotification());
    await storageClearAll();
    shutdownChatClient();
    ga.onceUserLogout();
  } catch (error) {
    await storageClearAll();
    console.log('logout', getErrorMessage(error));
  }
};
