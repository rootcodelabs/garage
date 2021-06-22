import {
  CREATE_EXPERTS,
  CREATE_EXPERTS_FAILED,
  CREATE_EXPERTS_SUCCESS,
  EXPERTS_CLEAR,
  GET_EXPERTS,
  GET_EXPERTS_FAILED,
  GET_EXPERTS_SUCCESS,
  GET_EXPERT_PROFILE_BY_ID,
  GET_EXPERT_PROFILE_BY_ID_FAILED,
  GET_EXPERT_PROFILE_BY_ID_SUCCESS,
  GET_EXPERTS_FOR_EXPERT,
  GET_EXPERTS_FOR_EXPERT_FAILED,
  GET_EXPERTS_FOR_EXPERT_SUCCESS,
  GET_EXPERTS_FOR_OWNER,
  GET_EXPERTS_FOR_OWNER_FAILED,
  GET_EXPERTS_FOR_OWNER_SUCCESS,
  USER_EXISTENCE,
  USER_EXISTENCE_FAILED,
  USER_EXISTENCE_SUCCESS,
  UPDATE_EXPERTS,
  UPDATE_EXPERTS_FAILED,
  UPDATE_EXPERTS_SUCCESS,
  GET_EXPERTS_FOR_CUSTOMER,
  GET_EXPERTS_FOR_CUSTOMER_FAILED,
  GET_EXPERTS_FOR_CUSTOMER_SUCCESS,
  SIGNUP_EXPERT,
  SIGNUP_EXPERT_FAILED,
  SIGNUP_EXPERT_SUCCESS,
  UserExistenceType,
  LangType,
} from './actions';

import { OwnerInterface } from '../owner/reducers';
import { ServiceType } from '../service/reducers';
import { ProfileType } from '../profile/reducers';

export interface AvailabilityType {
  monday: [{ start: number; end: number }];
  tuesday: [{ start: number; end: number }];
  wednesday: [{ start: number; end: number }];
  thursday: [{ start: number; end: number }];
  friday: [{ start: number; end: number }];
  saturday: [{ start: number; end: number }];
  sunday: [{ start: number; end: number }];
  timezone: string;
}

export interface ExpertType {
  joinedDate?: string;
  email?: string;
  userId: string;
  name: string;
  phoneNumber: string;
  profilePic: string | null;
  country: string | null;
  occupation: string;
  bio: string | null;
  services?: ServiceType[];
  owner: null | OwnerInterface;
  rating: number;
  ratingCount: number;
  online: boolean;
  yearsOfExperience?: number | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  stateProvinceRegion: string | null;
  postalCode: string | null;
  languages: LangType[];
  availability: AvailabilityType | null;
}

export interface ExpertsInitialState {
  ownerExperts: ExpertType | null;
  expertExperts: ExpertType | null;
  expertProfile: ExpertType | null;
  expertSignUpProfile: ExpertType | null;
  experts: ExpertType[];
  customerExperts: ProfileType[];
  isLoading: boolean;
  expertError: string | null;
  serviceUpdateSuccessMessage: string | null;
  userExistence: UserExistenceType | null;
  userExistenceSuccessMsg: UserExistenceType | null;
  userExistenceError: string | null;
  expertSignupSuccessMessage: string | null;
  expertSignupError: string | null;
}

export const initialState: ExpertsInitialState = {
  experts: [],
  isLoading: false,
  expertError: null,
  ownerExperts: null,
  expertExperts: null,
  expertProfile: null,
  expertSignUpProfile: null,
  customerExperts: [],
  userExistence: null,
  serviceUpdateSuccessMessage: null,
  userExistenceSuccessMsg: null,
  userExistenceError: null,
  expertSignupSuccessMessage: null,
  expertSignupError: null,
};

const authReducer = (state = initialState, action: any): ExpertsInitialState => {
  switch (action.type) {
    case GET_EXPERTS:
      return {
        ...state,
        isLoading: true,
        expertError: null,
      };
    case GET_EXPERTS_FAILED:
      return {
        ...state,
        isLoading: false,
        expertError: action.payload,
      };

    case GET_EXPERTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        experts: action.payload,
      };
    case EXPERTS_CLEAR:
      return {
        ...state,
        isLoading: false,
        expertError: null,
        serviceUpdateSuccessMessage: null,
        userExistenceSuccessMsg: null,
        userExistenceError: null,
        expertSignupSuccessMessage: null,
        expertSignupError: null,
      };

    case CREATE_EXPERTS:
      return { ...state, isLoading: true, expertError: null };
    case CREATE_EXPERTS_SUCCESS:
      return { ...state, isLoading: false };
    case CREATE_EXPERTS_FAILED:
      return { ...state, isLoading: false, expertError: action.payload };

    case SIGNUP_EXPERT:
      return { ...state, isLoading: true, expertSignupError: null };
    case SIGNUP_EXPERT_SUCCESS:
      return { ...state, isLoading: false, expertSignupSuccessMessage: action.payload };
    case SIGNUP_EXPERT_FAILED:
      return { ...state, isLoading: false, expertSignupError: action.payload };

    case UPDATE_EXPERTS:
      return { ...state, isLoading: true, expertError: null, serviceUpdateSuccessMessage: null };
    case UPDATE_EXPERTS_SUCCESS:
      return { ...state, isLoading: false, serviceUpdateSuccessMessage: action.payload };
    case UPDATE_EXPERTS_FAILED:
      return { ...state, isLoading: false, expertError: action.payload };

    case GET_EXPERTS_FOR_OWNER:
      return { ...state, isLoading: true, expertError: null };
    case GET_EXPERTS_FOR_OWNER_SUCCESS:
      return { ...state, isLoading: false, ownerExperts: action.payload };
    case GET_EXPERTS_FOR_OWNER_FAILED:
      return { ...state, isLoading: false, expertError: action.payload };

    case GET_EXPERTS_FOR_CUSTOMER:
      return { ...state, isLoading: true, expertError: null };
    case GET_EXPERTS_FOR_CUSTOMER_SUCCESS:
      return { ...state, isLoading: false, customerExperts: action.payload };
    case GET_EXPERTS_FOR_CUSTOMER_FAILED:
      return { ...state, isLoading: false, expertError: action.payload };

    case GET_EXPERTS_FOR_EXPERT:
      return { ...state, isLoading: true, expertError: null };
    case GET_EXPERTS_FOR_EXPERT_SUCCESS:
      return { ...state, isLoading: false, expertExperts: action.payload };
    case GET_EXPERTS_FOR_EXPERT_FAILED:
      return { ...state, isLoading: false, expertError: action.payload };

    case GET_EXPERT_PROFILE_BY_ID:
      return { ...state, isLoading: true, expertError: null };
    case GET_EXPERT_PROFILE_BY_ID_SUCCESS:
      return { ...state, isLoading: false, expertProfile: action.payload };
    case GET_EXPERT_PROFILE_BY_ID_FAILED:
      return { ...state, isLoading: false, expertError: action.payload };

    case USER_EXISTENCE:
      return { ...state, isLoading: true, userExistenceSuccessMsg: null, userExistenceError: null };
    case USER_EXISTENCE_FAILED:
      return { ...state, isLoading: false, userExistenceError: action.payload };
    case USER_EXISTENCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userExistenceSuccessMsg: action.payload,
        userExistence: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
