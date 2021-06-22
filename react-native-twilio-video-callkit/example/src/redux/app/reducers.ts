import {
  APP_SET_USER_TYPE,

  GET_TWILLIO_VIDEO_TOKEN,
  GET_TWILLIO_VIDEO_TOKEN_FAILED,
  GET_TWILLIO_VIDEO_TOKEN_SUCCESS,
  SET_CALL_STATUS,
  SET_CALL_STATUS_TYPE,
  GET_LATEST_INFO,
  GET_LATEST_INFO_FAILED,
  GET_LATEST_INFO_SUCCESS,
  SET_SHOW_SIGN_IN_MODAL,

  SET_CALL_ANSWERED,
  GET_HOME,
  GET_HOME_FAILED,
  GET_HOME_SUCCESS,
  SET_REMOTE_MESSAGES
} from './actions';

import { LatestCallLogType } from '../callLogs/reducers';
// import { DEEP_LINK_TYPES_ENUM } from '../../constance';
// import { ServiceType } from '../service/reducers';
// import { ExpertType } from '../experts/reducers';

const INIT_STATE: AppInitialState = {
  appInitCompleted: false,
  isInExpertView: false,

  twillioVideoToken: null,
  twillioVideoExpire: null,
  twillioVideoLoading: false,
  twillioVideoTokenError: null,

  twillioChatToken: null,
  twillioChatExpire: null,
  twillioChatLoading: false,
  twillioChatTokenError: null,

  currentCall: null,
  currentCallType: null,
  callAnswered: false,
  latestAppInfo: null,
  latestAppInfoLoading: false,
  isAppOld: false,
  isLatestVersion: true,
  nextDeepLinkValue: null,
  noSingInModal: null,
  homeData: null,
  getHomeDataError: null,
  homeLoading: null,
  hasRemoteMessages: false,
};

// export interface HomeType {
//   freeServices: ServiceType[];
//   latestServices: ServiceType[];
//   onlineExperts: ExpertType[];
// }
export type NoSignInType = 'FAVOURITE' | 'BOOK' | 'CHAT' | 'COMMON' | 'PROFILE' | 'FAVORITE_BTN' | null;

export interface AppInitialState {
  appInitCompleted: boolean;
  isInExpertView: boolean;
  twillioVideoLoading: boolean;
  twillioVideoToken: string | null;
  twillioVideoExpire: string | null;

  twillioChatToken: string | null;
  twillioChatExpire: string | null;
  twillioChatLoading: boolean;
  twillioChatTokenError: string | null;
  twillioVideoTokenError: string | null;
  currentCall: LatestCallLogType | null;
  currentCallType: 'incomming' | 'outgoing' | null;
  callAnswered: boolean;
  latestAppInfo: null | {
    minVersionIOS: string;
    minVersionAndroid: string;
    latestVersionIOS: string;
    latestVersionAndroid: string;
    minVersionErrorMessage: string;
    maintenanceMessage: string;
    infoMessage: string;
    createdDate: string;
    appJson: string;
    enableMaintenance: boolean;
  };
  isAppOld: boolean;
  isLatestVersion: boolean;
  latestAppInfoLoading: boolean;
  noSingInModal: NoSignInType;
  // nextDeepLinkValue: null | {
  //   type: DEEP_LINK_TYPES_ENUM;
  //   value: string;
  // };
  // homeData: HomeType | null;
  getHomeDataError: null;
  homeLoading: null;
  hasRemoteMessages: boolean;
}

const authReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case APP_SET_USER_TYPE:
      return {
        ...state,
        isInExpertView: action.payload.isInExpertView,
      };

    case GET_TWILLIO_VIDEO_TOKEN:
      return { ...state, twillioVideoLoading: true, twillioVideoTokenError: null };
    case GET_TWILLIO_VIDEO_TOKEN_FAILED:
      return {
        ...state,
        twillioVideoLoading: false,
        twillioVideoTokenError: action.payload,
      };
    case GET_TWILLIO_VIDEO_TOKEN_SUCCESS:
      return {
        ...state,
        twillioVideoLoading: false,
        twillioVideoExpire: action.payload.twillioVideoExpire,
        twillioVideoToken: action.payload.twillioVideoToken,
      };

    case GET_HOME:
      return { ...state, getHomeDataError: null, homeLoading: true };
    case GET_HOME_FAILED:
      return { ...state, homeLoading: false, getHomeDataError: action.payload };
    case GET_HOME_SUCCESS:
      return { ...state, homeLoading: false, homeData: action.payload };

    case SET_CALL_STATUS:
      return { ...state, currentCall: action.payload };
    case SET_CALL_STATUS_TYPE:
      return { ...state, currentCallType: action.payload };

    case GET_LATEST_INFO:
      return { ...state, latestAppInfoLoading: true };
    case GET_LATEST_INFO_SUCCESS:
      return {
        ...state,
        latestAppInfo: action.payload.latestAppInfo,
        isAppOld: action.payload.isAppOld,
        isLatestVersion: action.payload.isLatestVersion,
        latestAppInfoLoading: false,
      };
    case GET_LATEST_INFO_FAILED:
      return { ...state, latestAppInfo: null, isAppOld: false, isLatestVersion: true, latestAppInfoLoading: false };
    case SET_SHOW_SIGN_IN_MODAL:
      return { ...state, noSingInModal: action.payload };
    case SET_CALL_ANSWERED:
      return { ...state, callAnswered: action.payload };
    case SET_REMOTE_MESSAGES:
      return { ...state, hasRemoteMessages: action.payload };
    default:
      return state;
  }
};

export default authReducer;
