import AsyncStorage from '@react-native-async-storage/async-storage';

import { logger } from './logger';
import { setAuthTokens } from '../redux/rootActions';
import { store } from '../App';

const TAG = 'storage.ts';
const KEY_AUTH_RESPONSE = 'auth_response';
const SHOWED_WHATS_NEW = 'show_whats_new';
const INVITE_DOWNLOAD = 'invite_download';
const SHOWED_WHATS_NEW_VALUE = 'showed_new';
const RECENT_SEARCHES = 'recent_searches';
const UPDATE_TIMEZONE = 'update_timezone';

export interface StoreAuthCredsType {
  userId: string;
  customerAccessToken: string;
  ownerAccessToken: string;
  expertAccessToken: string;
}

export interface InviteDownloadStatusI {
  status: 'CLICK_AND_DOWNLOAD' | 'CLICK_ONLY' | 'NONE';
  invitedBy?: string;
}

const getAuthCreds = async () => {
  try {
    const value = await AsyncStorage.getItem(KEY_AUTH_RESPONSE);
    if (value) {
      const result = JSON.parse(value);
      storeAuthCreds(result);
      return result;
    }
    return null;
  } catch (error) {
    logger.error(`${TAG} getAuthCreds error`, error);
    throw error;
  }
};

export const storageClearAll = async () => {
  try {
    const isShowedWhatsNew = await isShowedWhatsNewPage();
    await AsyncStorage.clear();
    if (isShowedWhatsNew) {
      await setShowedWhatsNewPage();
    }
  } catch (error) {
    logger.error(`${TAG} storageClearAll error`, error);
  }
};

export const storeAuthCreds = async (response: StoreAuthCredsType) => {
  try {
    await AsyncStorage.setItem(KEY_AUTH_RESPONSE, JSON.stringify(response));
    await moveAuthCredsToReduxIfAvailable();
  } catch (error) {
    logger.error(`${TAG} storeAuthCreds error`, error);
  }
};

export const moveAuthCredsToReduxIfAvailable = async () => {
  try {
    const value = await AsyncStorage.getItem(KEY_AUTH_RESPONSE);
    if (value) {
      const result = JSON.parse(value);
      await store.dispatch(setAuthTokens(result));
    }
    return null;
  } catch (error) {
    logger.error(`${TAG} moveAuthCredsToReduxIfAvailable error`, error);
    return null;
  }
};

export const hasLoggedIn = async () => {
  try {
    const responseObject = await getAuthCreds();
    if (responseObject) {
      return true;
    }
    return false;
  } catch (error) {
    logger.error(`${TAG} hasLoggedIn error`, error);
    return false;
  }
};

export const inviteLinkUpdate = async () => {
  try {
    const responseObject = await getAuthCreds();
    if (responseObject) {
      return true;
    }
    return false;
  } catch (error) {
    logger.error(`${TAG} inviteLinkUpdate error`, error);
    return false;
  }
};

export const setInvitedDownloadStatus = async (
  status: 'CLICK_AND_DOWNLOAD' | 'CLICK_ONLY' | 'NONE',
  invitedBy?: string,
) => {
  try {
    await AsyncStorage.setItem(
      INVITE_DOWNLOAD,
      JSON.stringify({
        status,
        invitedBy,
      }),
    );
  } catch (error) {
    logger.error(`${TAG} setInvitedDownloadStatus error`, error);
  }
};

export const getInvitedDownloadStatus = async (): Promise<InviteDownloadStatusI | null> => {
  try {
    const value = await AsyncStorage.getItem(INVITE_DOWNLOAD);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  } catch (error) {
    logger.error(`${TAG} getInvitedDownloadStatus error`, error);
    return null;
  }
};

export const setAppNotDownloadedFromDeepLink = async () => {
  try {
    const value = await getInvitedDownloadStatus();
    if (!value) {
      return setInvitedDownloadStatus('NONE');
    }
  } catch (error) {
    logger.error(`${TAG} setAppNotDownloadedFromDeepLink error`, error);
    return null;
  }
};
/**
 * Remove inviter from the storage when success signUp
 */
export const removeInviterFromStorage = async () => {
  try {
    const value = await getInvitedDownloadStatus();
    if (value) {
      return setInvitedDownloadStatus(value.status);
    }
  } catch (error) {
    logger.error(`${TAG} removeInviterFromStorage error`, error);
    return null;
  }
};

export const setShowedWhatsNewPage = async () => {
  try {
    await AsyncStorage.setItem(SHOWED_WHATS_NEW, SHOWED_WHATS_NEW_VALUE);
  } catch (error) {
    logger.error(`${TAG} showedWhatsNewPage error`, error);
  }
};

export const isShowedWhatsNewPage = async () => {
  try {
    const value = await AsyncStorage.getItem(SHOWED_WHATS_NEW);
    return value === SHOWED_WHATS_NEW_VALUE;
  } catch (error) {
    return true;
  }
};

export const createDraft = async (params: object) => {
  try {
    await AsyncStorage.setItem('draft', JSON.stringify(params));
  } catch (e) {
    console.log(e);
  }
};

export const getDraft = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('draft');
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
  } catch (e) {
    console.log(e);
  }
};

export const removeDraft = async () => {
  try {
    await AsyncStorage.removeItem('draft');
  } catch (e) {
    console.log(e);
  }
};

export const addToRecentSearches = async (params: string[]) => {
  try {
    await AsyncStorage.setItem(RECENT_SEARCHES, JSON.stringify(params));
  } catch (error) {
    logger.error(`${TAG} addToRecentSearches error`, error);
  }
};

export const getRecentSearches = async (): Promise<string[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(RECENT_SEARCHES);
    if (!jsonValue) {
      return [];
    }
    return JSON.parse(jsonValue);
  } catch (error) {
    logger.error(`${TAG} getRecentSearches error`, error);
    return [];
  }
};

export const clearRecentSearches = async () => {
  try {
    await AsyncStorage.removeItem(RECENT_SEARCHES);
  } catch (error) {
    logger.error(`${TAG} clearRecentSearches error`, error);
  }
};

export const setStatusUpdateTimeZone = async (params: string) => {
  try {
    await AsyncStorage.setItem(UPDATE_TIMEZONE, JSON.stringify(params));
  } catch (error) {
    logger.error(`${TAG} setStatusUpdateTimezone error`, error);
  }
};

export const getStatusUpdateTimeZone = async (): Promise<string | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(UPDATE_TIMEZONE);
    if (!jsonValue) {
      return null;
    }
    return JSON.parse(jsonValue);
  } catch (error) {
    logger.error(`${TAG} getStatusUpdateTimezone error`, error);
    return null;
  }
};
