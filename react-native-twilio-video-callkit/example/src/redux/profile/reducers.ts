import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
  PROFILE,
  PROFILE_CLEAR,
  PROFILE_FAILED,
  PROFILE_SUCCESS,
  PROFILE_SUCCESS_IS_EXPERT,
  PROFILE_SUCCESS_IS_OWNER,
  SET_ONLINE_STATUS,
  SET_ONLINE_STATUS_FAILED,
  SET_ONLINE_STATUS_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_EXPERT_PROFILE,
  UPDATE_EXPERT_PROFILE_FAILED,
  UPDATE_EXPERT_PROFILE_SUCCESS,
  EXPERT_PROFILE,
  EXPERT_PROFILE_SUCCESS,
  EXPERT_PROFILE_FAILED,
  UPDATE_EXPERT_AVAILABILITY,
  UPDATE_EXPERT_AVAILABILITY_SUCCESS,
  UPDATE_EXPERT_AVAILABILITY_FAILED,
} from './actions';

import { CurrencyType } from '../currency/reducers';
import { OwnerInterface } from '../owner/reducers';
import { ExpertType } from '../experts/reducers';
import { LangType } from '../experts/actions';

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

export interface MyProfileType {
  userId: string; // need to take this explixity

  authentication: 'LOCAL' | 'GOOGLE' | 'FACEBOOK ';
  email: string;
  federatedId: string | null;
  isVerified: boolean;
  isOwner: boolean;
  isExpert: boolean;
  joinedDate: string;
  referralCode: string | null;
  referralCount: number;

  customerProfile: ProfileType;
  expertProfile: ExpertType;
  preferredCurrency: CurrencyType;
  ownerProfile: OwnerInterface;
}

interface ProfileAction {
  type: typeof PROFILE;
  payload: MyProfileType;
}

export interface ProfileInitialState {
  profile: MyProfileType | null;
  expertProfile: ExpertType | null;
  preferredCurrency: CurrencyType | null;
  isLoading: boolean;
  isOwner: boolean;
  isExpert: boolean;
  profileError: string | null;
  isLoadingOnline: boolean;
  onlineStatusError: null | string;
  email: null | string;
  changePasswordSuccessMessage: string | null;
  updateProfileSuccessMessage: string | null;
  updateExpertProfileSuccessMessage: string | null;
  changePasswordError: string | null;
  updateProfileError: string | null;
  updateExpertAvailabilitySuccessMessage: string | null;
  expertAvailabilityError: string | null;
}

export const initialState: ProfileInitialState = {
  profile: null,
  expertProfile: null,
  email: null,
  isLoading: false,
  isLoadingOnline: false,
  onlineStatusError: null,
  isOwner: false,
  isExpert: false,
  profileError: null,
  changePasswordSuccessMessage: null,
  updateProfileSuccessMessage: null,
  updateExpertProfileSuccessMessage: null,

  changePasswordError: null,
  updateProfileError: null,
  preferredCurrency: null,
  updateExpertAvailabilitySuccessMessage: null,
  expertAvailabilityError: null,
};

export type ProfileActionTypes = ProfileAction;
const authReducer = (state = initialState, action: any): ProfileInitialState => {
  switch (action.type) {
    case PROFILE:
      return {
        ...state,
        isLoading: true,
        changePasswordSuccessMessage: null,
        updateProfileSuccessMessage: null,

        profileError: null,
      };
    case PROFILE_FAILED:
      return { ...state, isLoading: false, profileError: action.payload };
    case PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: {
          userId: action.payload.customerProfile.userId,
          ...action.payload,
        },
        email: action.payload.email,
        preferredCurrency: action.payload.preferredCurrency,
        expertProfile: action.payload.expertProfile,
      };
    case EXPERT_PROFILE:
      return {
        ...state,
        isLoading: true,
        profileError: null,
      };
    case EXPERT_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        expertProfile: action.payload,
      };
    case EXPERT_PROFILE_FAILED:
      return { ...state, isLoading: false, profileError: action.payload };
    case PROFILE_SUCCESS_IS_OWNER:
      return { ...state, isOwner: action.payload };
    case PROFILE_SUCCESS_IS_EXPERT:
      return { ...state, isExpert: action.payload };
    case PROFILE_CLEAR:
      return {
        ...state,
        isLoading: false,
        profileError: null,
        changePasswordSuccessMessage: null,
        updateProfileSuccessMessage: null,

        changePasswordError: null,
        updateProfileError: null,
        updateExpertAvailabilitySuccessMessage: null,
        expertAvailabilityError: null,
      };

    case SET_ONLINE_STATUS:
      return { ...state, isLoadingOnline: true, onlineStatusError: null };
    case SET_ONLINE_STATUS_FAILED:
      return { ...state, isLoadingOnline: false, profileError: action.payload };
    case SET_ONLINE_STATUS_SUCCESS:
      return { ...state, isLoadingOnline: false, onlineStatusError: action.payload };

    case CHANGE_PASSWORD:
      return { ...state, isLoading: true, changePasswordSuccessMessage: null, changePasswordError: null };
    case CHANGE_PASSWORD_FAILED:
      return { ...state, isLoading: false, changePasswordError: action.payload };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, changePasswordSuccessMessage: action.payload };

    case UPDATE_PROFILE:
      return { ...state, isLoading: true, updateProfileSuccessMessage: null, profileError: null };
    case UPDATE_PROFILE_FAILED:
      return { ...state, isLoading: false, updateProfileError: action.payload };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, isLoading: false, updateProfileSuccessMessage: action.payload };

    case UPDATE_EXPERT_PROFILE:
      return { ...state, isLoading: true, updateExpertProfileSuccessMessage: null, profileError: null };
    case UPDATE_EXPERT_PROFILE_FAILED:
      return { ...state, isLoading: false, updateProfileError: action.payload };
    case UPDATE_EXPERT_PROFILE_SUCCESS:
      return { ...state, isLoading: false, updateExpertProfileSuccessMessage: action.payload };

    case UPDATE_EXPERT_AVAILABILITY:
      return { ...state, isLoading: true, expertAvailabilityError: null, updateExpertAvailabilitySuccessMessage: null };
    case UPDATE_EXPERT_AVAILABILITY_SUCCESS:
      return { ...state, isLoading: false, updateExpertAvailabilitySuccessMessage: action.payload };
    case UPDATE_EXPERT_AVAILABILITY_FAILED:
      return { ...state, isLoading: false, expertAvailabilityError: action.payload };

    default:
      return state;
  }
};

export default authReducer;
