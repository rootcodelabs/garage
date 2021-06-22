import {
  CLEAR_ERRORS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SHOULD_EMAIL_VERIFY,
  SIGNUP,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  SET_AUTH_TOKENS,
  RESEND_EMAIL,
  RESEND_EMAIL_SUCCESS,
  RESEND_EMAIL_FAILED,
} from './actions';
export interface AuthTokens {
  customerAccessToken: string;
  ownerAccessToken: string;
  expertAccessToken: string;
}

export interface SignUpResponse {
  customerAccessToken: string;
  expertAccessToken: string;
  isExpert: boolean;
  isOwner: boolean;
  isVerified: boolean;
  ownerAccessToken: string;
  userId: string;
  creditsEarned: number;
}

export interface AuthInitialState {
  username: string;
  password: string;
  isLoading: boolean;
  tokens: null | AuthTokens;
  loginErrorMessage?: string | null;
  signupErrorMessage?: string | null;
  sigupSuccess: boolean;
  loginSuccess: boolean;
  shouldRedirectToVerify: boolean;
  forgotPasswordErrorMessage?: string | null;
  forgotPasswordSuccess?: string | null;
  signUpCreditsEarned: number;

  loadingResendEmail: boolean;
  resendEmailDone: boolean;
}

export const initialState: AuthInitialState = {
  username: '',
  password: '',
  isLoading: false,
  tokens: null,
  loginErrorMessage: null,
  signupErrorMessage: null,
  sigupSuccess: false,
  loginSuccess: false,
  shouldRedirectToVerify: false,
  forgotPasswordErrorMessage: null,
  forgotPasswordSuccess: null,
  signUpCreditsEarned: 0,
  loadingResendEmail: false,
  resendEmailDone: false,
};

const authReducer = (state = initialState, action: any): AuthInitialState => {
  switch (action.type) {
    case SET_AUTH_TOKENS:
      return {
        ...state,
        tokens: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        isLoading: true,
        loginErrorMessage: null,
        signupErrorMessage: null,
        loginSuccess: false,
        shouldRedirectToVerify: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload.username || '',
        password: action.payload.password || '',
        isLoading: false,
        loginSuccess: true,
      };
    case LOGIN_FAILED:
      return { ...state, username: '', password: '', isLoading: false, loginErrorMessage: action.payload };
    case SIGNUP:
      return {
        ...state,
        isLoading: true,
        loginErrorMessage: null,
        signupErrorMessage: null,
        shouldRedirectToVerify: false,
        sigupSuccess: false,
      };
    case SIGNUP_SUCCESS:
      return { ...state, isLoading: false, sigupSuccess: true, signUpCreditsEarned: action.payload.creditsEarned };
    case SIGNUP_FAILED:
      return { ...state, username: '', password: '', isLoading: false, signupErrorMessage: action.payload };

    case FORGOT_PASSWORD:
      return {
        ...state,
        isLoading: true,
        loginErrorMessage: null,
        signupErrorMessage: null,
        forgotPasswordSuccess: null,
        forgotPasswordErrorMessage: null,
        shouldRedirectToVerify: false,
        sigupSuccess: false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, forgotPasswordSuccess: action.payload, forgotPasswordErrorMessage: null };
    case FORGOT_PASSWORD_FAILED:
      return { ...state, isLoading: false, forgotPasswordErrorMessage: action.payload };

    case CLEAR_ERRORS:
      return {
        ...state,
        isLoading: false,
        loginErrorMessage: null,
        signupErrorMessage: null,
        shouldRedirectToVerify: false,
        forgotPasswordSuccess: null,
        forgotPasswordErrorMessage: null,
        sigupSuccess: false,
        signUpCreditsEarned: 0,
        loginSuccess: false,
      };
    case SHOULD_EMAIL_VERIFY:
      return {
        ...state,
        isLoading: false,
        loginErrorMessage: null,
        signupErrorMessage: null,
        shouldRedirectToVerify: true,
      };

    case RESEND_EMAIL:
      return { ...state, loadingResendEmail: true, resendEmailDone: false };
    case RESEND_EMAIL_SUCCESS:
      return { ...state, loadingResendEmail: false, resendEmailDone: true };
    case RESEND_EMAIL_FAILED:
      return { ...state, loadingResendEmail: false, resendEmailDone: false };
    default:
      return state;
  }
};

export default authReducer;
