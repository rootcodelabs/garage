import {
  GET_MY_BUSINESS_PROFILE,
  GET_MY_BUSINESS_PROFILE_FAILED,
  GET_MY_BUSINESS_PROFILE_SUCCESS,
  GET_OWNERS_BY_CAT,
  GET_OWNERS_BY_CAT_FAILED,
  GET_OWNERS_BY_CAT_SUCCESS,
  UPDATE_OWNER_PROFILE,
  UPDATE_OWNER_PROFILE_FAILED,
  UPDATE_OWNER_PROFILE_SUCCESS,
  GET_OWNERS_FOR_CUSTOMER,
  GET_OWNERS_FOR_CUSTOMER_FAILED,
  GET_OWNERS_FOR_CUSTOMER_SUCCESS,
  OWNER_CLEAR_ERRORS,
  GET_MY_BUSINESS_EXPERTS,
  GET_MY_BUSINESS_EXPERTS_FAILED,
  GET_MY_BUSINESS_EXPERTS_SUCCESS,
  UPDATE_MY_BUSINESS_EXPERTS,
  UPDATE_MY_BUSINESS_EXPERTS_FAILED,
  UPDATE_MY_BUSINESS_EXPERTS_SUCCESS,
} from './actions';
import { ExpertType } from '../experts/reducers';

export interface OwnerInterface {
  userId: string;
  username: string;
  name: string;
  phoneNumber: string;
  website: string | null;
  about: string | null;
  businessLogo?: string | null;
  type: 'INDIVIDUAL' | 'BUSINESS';
  category?: any | null;
  experts: ExpertType[];
  rating: number;
  ratingCount: number;
  joinedDate: string;
}

interface GetOwnerAction {
  type: typeof GET_OWNERS_BY_CAT;
  payload: OwnerInterface;
}

export interface OwnerInitialState {
  ownersByCategory: OwnerInterface[];
  owners: OwnerInterface[];
  ownersExperts: ExpertType[];
  ownerProfile: OwnerInterface | null;
  isLoading: boolean;
  ownerError: string | null;
  ownerUpdateError: string | null;
  updateProfileSuccessMessage: string | null;
  updateExpertsSuccessMsg: string | null;
  updateExpertsErrorMsg: string | null;
}

export const initialState: OwnerInitialState = {
  ownersByCategory: [],
  owners: [],
  ownerProfile: null,
  isLoading: false,
  ownerError: null,
  ownerUpdateError: null,
  updateProfileSuccessMessage: null,
  updateExpertsSuccessMsg: null,
  updateExpertsErrorMsg: null,
  ownersExperts: [],
};

export type OwnerActionTypes = GetOwnerAction;
const authReducer = (state = initialState, action: OwnerActionTypes) => {
  switch (action.type) {
    case OWNER_CLEAR_ERRORS:
      return {
        ...state,
        isLoading: false,
        ownerError: null,
        ownerUpdateError: null,
        updateProfileSuccessMessage: null,
        updateExpertsSuccessMsg: null,
        updateExpertsErrorMsg: null,
      };
    case GET_OWNERS_BY_CAT:
      return { ...state, isLoading: true, ownerError: null };
    case GET_OWNERS_BY_CAT_FAILED:
      return { ...state, isLoading: false, ownerError: action.payload };

    case GET_OWNERS_BY_CAT_SUCCESS:
      return { ...state, isLoading: false, ownersByCategory: action.payload };

    case GET_OWNERS_FOR_CUSTOMER:
      return { ...state, isLoading: true, ownerError: null };
    case GET_OWNERS_FOR_CUSTOMER_FAILED:
      return { ...state, isLoading: false, ownerError: action.payload };

    case GET_OWNERS_FOR_CUSTOMER_SUCCESS:
      return { ...state, isLoading: false, owners: action.payload };

    case GET_MY_BUSINESS_PROFILE:
      return { ...state, isLoading: true, ownerError: null };
    case GET_MY_BUSINESS_PROFILE_FAILED:
      return { ...state, isLoading: false, ownerError: action.payload };

    case GET_MY_BUSINESS_PROFILE_SUCCESS:
      return { ...state, isLoading: false, ownerProfile: action.payload };

    case GET_MY_BUSINESS_EXPERTS:
      return { ...state, isLoading: true, ownerError: null };
    case GET_MY_BUSINESS_EXPERTS_FAILED:
      return { ...state, isLoading: false, ownerError: action.payload };

    case GET_MY_BUSINESS_EXPERTS_SUCCESS:
      return { ...state, isLoading: false, ownersExperts: action.payload };

    case UPDATE_MY_BUSINESS_EXPERTS:
      return { ...state, isLoading: true, updateExpertsSuccessMsg: null, updateExpertsErrorMsg: null };
    case UPDATE_MY_BUSINESS_EXPERTS_FAILED:
      return { ...state, isLoading: false, updateExpertsErrorMsg: action.payload };
    case UPDATE_MY_BUSINESS_EXPERTS_SUCCESS:
      return { ...state, isLoading: false, updateExpertsSuccessMsg: action.payload };

    case UPDATE_OWNER_PROFILE:
      return { ...state, isLoading: true, updateProfileSuccessMessage: null, ownerUpdateError: null };
    case UPDATE_OWNER_PROFILE_FAILED:
      return { ...state, isLoading: false, ownerUpdateError: action.payload };
    case UPDATE_OWNER_PROFILE_SUCCESS:
      return { ...state, isLoading: false, updateProfileSuccessMessage: action.payload };

    default:
      return state;
  }
};

export default authReducer;
