import { axiosConfig, getErrorMessage, setSentryUser } from '../../utils';

import { API_URL } from '../../constance';
import { RootState } from '../rootReducer';
import axios from 'axios';
import { getMyOwnerProfile } from '../owner/actions';
import { setUserViewType } from '../app/actions';
import { LangType } from '../experts/actions';

const PREFIX = '@PROFILE_';

export const EXPERT_PROFILE = PREFIX + 'EXPERT_PROFILE';
export const EXPERT_PROFILE_SUCCESS = PREFIX + 'EXPERT_PROFILE_SUCCESS';
export const EXPERT_PROFILE_FAILED = PREFIX + 'EXPERT_PROFILE_FAILED';

export const PROFILE = PREFIX + 'PROFILE';
export const PROFILE_SUCCESS = PREFIX + 'PROFILE_SUCCESS';
export const PROFILE_FAILED = PREFIX + 'PROFILE_FAILED';
export const PROFILE_SUCCESS_IS_OWNER = PREFIX + 'PROFILE_SUCCESS_IS_OWNER';
export const PROFILE_SUCCESS_IS_EXPERT = PREFIX + 'PROFILE_SUCCESS_IS_EXPERT';

export const UPDATE_PROFILE = PREFIX + 'UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = PREFIX + 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = PREFIX + 'UPDATE_PROFILE_FAILED';

export const UPDATE_EXPERT_PROFILE = PREFIX + 'UPDATE_EXPERT_PROFILE';
export const UPDATE_EXPERT_PROFILE_SUCCESS = PREFIX + 'UPDATE_EXPERT_PROFILE_SUCCESS';
export const UPDATE_EXPERT_PROFILE_FAILED = PREFIX + 'UPDATE_EXPERT_PROFILE_FAILED';

export const UPDATE_EXPERT_AVAILABILITY = PREFIX + 'UPDATE_EXPERT_AVAILABILITY';
export const UPDATE_EXPERT_AVAILABILITY_SUCCESS = PREFIX + 'UPDATE_EXPERT_AVAILABILITY_SUCCESS';
export const UPDATE_EXPERT_AVAILABILITY_FAILED = PREFIX + 'UPDATE_EXPERT_AVAILABILITY_FAILED';

export const CHANGE_PASSWORD = PREFIX + 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = PREFIX + 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILED = PREFIX + 'CHANGE_PASSWORD_FAILED';

export const SET_ONLINE_STATUS = PREFIX + 'SET_ONLINE_STATUS';
export const SET_ONLINE_STATUS_SUCCESS = PREFIX + 'SET_ONLINE_STATUS_SUCCESS';
export const SET_ONLINE_STATUS_FAILED = PREFIX + 'SET_ONLINE_STATUS_FAILED';

export const PROFILE_CLEAR = PREFIX + 'PROFILE_';
export const clearProfileMessages = () => (dispatch: any) => {
  dispatch({ type: PROFILE_CLEAR });
};

export const getProfile = (autoSetUserView: boolean = false) => async (dispatch: any) => {
  try {
    dispatch({ type: PROFILE });
    const config = await axiosConfig('customerAccessToken');
    if (!config) {
      dispatch({ type: PROFILE_FAILED, payload: 'Session not found. Please logout' });
    } else {
      const response = await axios.get(API_URL + '/users/me', config);
      dispatch({ type: PROFILE_SUCCESS_IS_OWNER, payload: response.data.isOwner });
      dispatch({ type: PROFILE_SUCCESS_IS_EXPERT, payload: response.data.isExpert });
      if (response.data.isOwner) {
        dispatch(getMyOwnerProfile());
      }
      if (autoSetUserView) {
        if (response.data.isOwner) {
          dispatch(setUserViewType('owner'));
        } else if (response.data.isExpert) {
          dispatch(setUserViewType('expert'));
        }
      }
      setSentryUser(response.data.customerProfile, response.data.email);
      dispatch({ type: PROFILE_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({ type: PROFILE_FAILED, payload: getErrorMessage(error) });
  }
};

export const getExpertProfile = () => async (dispatch: any) => {
  try {
    dispatch({ type: EXPERT_PROFILE });
    const config = await axiosConfig('expertAccessToken');
    const response = await axios.get(`${API_URL}/experts/me`, config);
    dispatch({ type: EXPERT_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: EXPERT_PROFILE_FAILED, payload: getErrorMessage(error) });
  }
};

export const setProfileOnline = (online: boolean) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: SET_ONLINE_STATUS });
    const expertConfig = await axiosConfig('expertAccessToken');
    const store: RootState = getState();
    if (store.profile && store.profile.isExpert) {
      await axios.put(`${API_URL}/experts/me/online`, { online }, expertConfig);
    }
    await dispatch(getProfile());
    dispatch({ type: SET_ONLINE_STATUS_SUCCESS });
  } catch (error) {
    dispatch({ type: SET_ONLINE_STATUS_FAILED, payload: getErrorMessage(error) });
  }
};

export const changePassword = (oldPassword: string, newPassword: string) => async (dispatch: any) => {
  try {
    dispatch({ type: CHANGE_PASSWORD });
    const config = await axiosConfig('customerAccessToken');
    await axios.post(`${API_URL}/auth/local/password`, { oldPassword, newPassword }, config);
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: 'changed successfully' });
  } catch (error) {
    dispatch({ type: CHANGE_PASSWORD_FAILED, payload: getErrorMessage(error) });
  }
};

export interface ProfileUpdateType {
  name: string;
  phoneNumber: string;
  occupation: string;
  bio: string;
  country: string;
  profilePic?: string;
}
export const updateProfile = (body: ProfileUpdateType) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_PROFILE });
    const config = await axiosConfig('customerAccessToken');
    body.profilePic ? body.profilePic : null;
    body.occupation ? body.occupation : null;
    body.bio ? body.bio : null;
    await axios.put(`${API_URL}/customers/me`, body, config);
    await dispatch(getProfile());
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: 'Successfully Updated' });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAILED, payload: getErrorMessage(error) });
  }
};

export interface ExpertProfileUpdateType {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateProvinceRegion?: string;
  postalCode?: string;
  yearsOfExperience?: number;
  languages?: LangType[];
}
export const updateExpertProfile = (body: ExpertProfileUpdateType) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_EXPERT_PROFILE });
    const config = await axiosConfig('expertAccessToken');

    await axios.put(
      `${API_URL}/experts/me`,
      {
        addressLine1: body.addressLine1 || null,
        addressLine2: body.addressLine2 || null,
        city: body.city || null,
        stateProvinceRegion: body.stateProvinceRegion || null,
        postalCode: body.postalCode || null,
        yearsOfExperience: body.yearsOfExperience || null,
        languages: body.languages || null,
      },
      config,
    );
    await dispatch(getExpertProfile());
    dispatch({ type: UPDATE_EXPERT_PROFILE_SUCCESS, payload: 'Successfully Updated' });
  } catch (error) {
    dispatch({ type: UPDATE_EXPERT_PROFILE_FAILED, payload: getErrorMessage(error) });
  }
};

export interface ExpertAvailabilityUpdateType {
  timezone: string;
  monday: {
    selected: boolean;
    start?: number;
    end?: number;
  };
  tuesday: {
    selected: boolean;
    start?: number;
    end?: number;
  };
  wednesday: {
    selected: boolean;
    start?: number;
    end?: number;
  };
  thursday: {
    selected: boolean;
    start?: number;
    end?: number;
  };
  friday: {
    selected: boolean;
    start?: number;
    end?: number;
  };
  saturday: {
    selected: boolean;
    start?: number;
    end?: number;
  };
  sunday: {
    selected: boolean;
    start?: number;
    end?: number;
  };
}
export const updateExpertAvailability = (body: ExpertAvailabilityUpdateType) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_EXPERT_AVAILABILITY });
    const config = await axiosConfig('expertAccessToken');

    await axios.put(
      `${API_URL}/experts/me/availability`,
      {
        timezone: body.timezone || null,
        ...(body.monday.selected && { monday: [{ start: body.monday.start, end: body.monday.end }] }),
        ...(body.tuesday.selected && { tuesday: [{ start: body.tuesday.start, end: body.tuesday.end }] }),
        ...(body.wednesday.selected && { wednesday: [{ start: body.wednesday.start, end: body.wednesday.end }] }),
        ...(body.thursday.selected && { thursday: [{ start: body.thursday.start, end: body.thursday.end }] }),
        ...(body.friday.selected && { friday: [{ start: body.friday.start, end: body.friday.end }] }),
        ...(body.saturday.selected && { saturday: [{ start: body.saturday.start, end: body.saturday.end }] }),
        ...(body.sunday.selected && { sunday: [{ start: body.sunday.start, end: body.sunday.end }] }),
      },
      config,
    );
    await dispatch(getExpertProfile());
    dispatch({ type: UPDATE_EXPERT_AVAILABILITY_SUCCESS, payload: 'Successfully Updated' });
  } catch (error) {
    dispatch({ type: UPDATE_EXPERT_AVAILABILITY_FAILED, payload: getErrorMessage(error) });
  }
};
