import axios from 'axios';
import { API_URL } from '../../constance';
import { getErrorMessage, axiosConfig } from '../../utils';
import { ServiceType } from '../service/reducers';
import { OwnerInterface } from '../owner/reducers';
import { ImageType } from '../upload/actions';
import { DocumentPickerResponse } from 'react-native-document-picker';

const PREFIX = '@EXPERTS_';

export const GET_EXPERTS = PREFIX + 'GET_EXPERTS';
export const GET_EXPERTS_SUCCESS = PREFIX + 'GET_EXPERTS_SUCCESS';
export const GET_EXPERTS_FAILED = PREFIX + 'GET_EXPERTS_FAILED';

export const GET_EXPERTS_FOR_CUSTOMER = PREFIX + 'GET_EXPERTS_FOR_CUSTOMER';
export const GET_EXPERTS_FOR_CUSTOMER_SUCCESS = PREFIX + 'GET_EXPERTS_FOR_CUSTOMER_SUCCESS';
export const GET_EXPERTS_FOR_CUSTOMER_FAILED = PREFIX + 'GET_EXPERTS_FOR_CUSTOMER_FAILED';

export const GET_EXPERT_PROFILE_BY_ID = PREFIX + 'GET_EXPERT_PROFILE_BY_ID';
export const GET_EXPERT_PROFILE_BY_ID_SUCCESS = PREFIX + 'GET_EXPERT_PROFILE_BY_ID_SUCCESS';
export const GET_EXPERT_PROFILE_BY_ID_FAILED = PREFIX + 'GET_EXPERT_PROFILE_BY_ID_FAILED';

export const GET_EXPERTS_FOR_OWNER = PREFIX + 'GET_EXPERTS_FOR_OWNER';
export const GET_EXPERTS_FOR_OWNER_SUCCESS = PREFIX + 'GET_EXPERTS_FOR_OWNER_SUCCESS';
export const GET_EXPERTS_FOR_OWNER_FAILED = PREFIX + 'GET_EXPERTS_FOR_OWNER_FAILED';

export const GET_EXPERTS_FOR_EXPERT = PREFIX + 'GET_EXPERTS_FOR_EXPERT';
export const GET_EXPERTS_FOR_EXPERT_SUCCESS = PREFIX + 'GET_EXPERTS_FOR_EXPERT_SUCCESS';
export const GET_EXPERTS_FOR_EXPERT_FAILED = PREFIX + 'GET_EXPERTS_FOR_EXPERT_FAILED';

export const UPDATE_EXPERTS = PREFIX + 'UPDATE_EXPERTS';
export const UPDATE_EXPERTS_SUCCESS = PREFIX + 'UPDATE_EXPERTS_SUCCESS';
export const UPDATE_EXPERTS_FAILED = PREFIX + 'UPDATE_EXPERTS_FAILED';

export const CREATE_EXPERTS = PREFIX + 'CREATE_EXPERTS';
export const CREATE_EXPERTS_SUCCESS = PREFIX + 'CREATE_EXPERTS_SUCCESS';
export const CREATE_EXPERTS_FAILED = PREFIX + 'CREATE_EXPERTS_FAILED';

export const USER_EXISTENCE = PREFIX + 'USER_EXISTENCE';
export const USER_EXISTENCE_SUCCESS = PREFIX + 'USER_EXISTENCE_SUCCESS';
export const USER_EXISTENCE_FAILED = PREFIX + 'USER_EXISTENCE_FAILED';

export const SIGNUP_EXPERT = PREFIX + 'SIGNUP_EXPERT';
export const SIGNUP_EXPERT_SUCCESS = PREFIX + 'SIGNUP_EXPERT_SUCCESS';
export const SIGNUP_EXPERT_FAILED = PREFIX + 'SIGNUP_EXPERT_FAILED';

export const EXPERTS_CLEAR = PREFIX + 'EXPERTS_';

interface ExpertsInterface {
  userId: string;
  name: string;
  phoneNumber: string;
  profilePic: string | null;
  occupation: string;
  bio: string | null;
  country: string | null;
  services: null | ServiceType;
  owner: null | OwnerInterface;
  rating: number;
  ratingCount: number;
  online: boolean;
  yearsOfExperience?: number | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  stateProvinceRegion?: string | null;
  postalCode?: string | null;
  languages?: any[];
}
export interface UserExistenceType {
  exists: boolean;
  userId: string;
  customerName: string;
  expertName: string;
  isExpert: boolean;
  isOwner: boolean;
  ownerName: string;
}

export interface LangType {
  language: string;
  proficiency: string;
}
export const clearExpertsMessages = () => (dispatch: any) => {
  dispatch({ type: EXPERTS_CLEAR });
};

export const getExperts = (ownerId?: string) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_EXPERTS });
    const config = await axiosConfig('customerAccessToken');
    const response = await axios.get(`${API_URL}/experts?ownerId=${ownerId}`, config);
    const experts: ExpertsInterface[] = response.data.experts || [];

    dispatch({ type: GET_EXPERTS_SUCCESS, payload: experts });
  } catch (error) {
    dispatch({ type: GET_EXPERTS_FAILED, payload: getErrorMessage(error) });
  }
};

export const getExpertForExpert = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_EXPERTS_FOR_EXPERT });
    const config = await axiosConfig('expertAccessToken');
    const response = await axios.get(`${API_URL}/experts`, config);
    const experts: ExpertsInterface[] = response.data || [];
    dispatch({ type: GET_EXPERTS_FOR_EXPERT_SUCCESS, payload: experts });
  } catch (error) {
    dispatch({ type: GET_EXPERTS_FOR_EXPERT_FAILED, payload: getErrorMessage(error) });
  }
};

export const getExpertForCustomer = (searchTerm: string) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_EXPERTS_FOR_CUSTOMER });
    const response = await axios.get(`${API_URL}/experts?q=${searchTerm}`);
    const experts: ExpertsInterface[] = response.data.experts || [];
    dispatch({ type: GET_EXPERTS_FOR_CUSTOMER_SUCCESS, payload: experts });
  } catch (error) {
    dispatch({ type: GET_EXPERTS_FOR_CUSTOMER_FAILED, payload: getErrorMessage(error) });
  }
};

export const createExpert = (
  name: string,
  phoneNumber: string,
  profilePic: string,
  occupation: string,
  bio: string,
) => async (dispatch: any) => {
  try {
    dispatch({ type: CREATE_EXPERTS });
    const config = await axiosConfig('ownerAccessToken');
    const response = await axios.post(
      `${API_URL}/experts`,
      {
        name,
        phoneNumber,
        profilePic,
        occupation,
        bio,
      },
      config,
    );

    dispatch({
      type: CREATE_EXPERTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: CREATE_EXPERTS_FAILED, payload: getErrorMessage(error) });
  }
};

export const getExpertsForOwner = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_EXPERTS_FOR_OWNER });
    const config = await axiosConfig('ownerAccessToken');
    const response = await axios.get(`${API_URL}/experts`, config);
    const experts: ExpertsInterface[] = response.data.experts || [];
    dispatch({ type: GET_EXPERTS_FOR_OWNER_SUCCESS, payload: experts });
  } catch (error) {
    dispatch({ type: GET_EXPERTS_FOR_OWNER_FAILED, payload: getErrorMessage(error) });
  }
};

export const getExpertProfileByUserId = (
  userId: string | number,
  tokenType: 'expertAccessToken' | 'customerAccessToken',
) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_EXPERT_PROFILE_BY_ID });
    const config = await axiosConfig(tokenType);
    const response = await axios.get(`${API_URL}/experts/${userId}`, config);
    dispatch({
      type: GET_EXPERT_PROFILE_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GET_EXPERT_PROFILE_BY_ID_FAILED, payload: getErrorMessage(error) });
  }
};

export const getExistenceUser = (email: string) => async (dispatch: any) => {
  try {
    dispatch({ type: USER_EXISTENCE });
    const config = await axiosConfig('ownerAccessToken');
    const response = await axios.post(`${API_URL}/users/existence`, { email }, config);
    const userExistence: UserExistenceType = response.data || null;
    dispatch({ type: USER_EXISTENCE_SUCCESS, payload: userExistence });
  } catch (error) {
    dispatch({ type: USER_EXISTENCE_FAILED, payload: getErrorMessage(error) });
  }
};

interface ExpertSignUpType {
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  categoryKey: string;
  categoryDescription: string;
  yearsOfExperience: string;
  idPassportNumber: string;
  personalFiles: DocumentPickerResponse[];
  professionalFiles: DocumentPickerResponse[];
  profilePic?: ImageType;
}

export const signUpExpert = (body: ExpertSignUpType) => async (dispatch: any) => {
  try {
    dispatch({ type: SIGNUP_EXPERT });
    const config = await axiosConfig('customerAccessToken');
    var data = new FormData();
    data.append('phoneNumber', body.phoneNumber);
    data.append('addressLine1', body.addressLine1);
    data.append('addressLine2', body.addressLine2);
    data.append('city', body.city);
    data.append('postalCode', body.postalCode);
    data.append('categoryKey', body.categoryKey);
    if (body.categoryKey === 'other') {
      data.append('categoryDescription', body.categoryDescription);
    }
    data.append('yearsOfExperience', body.yearsOfExperience);
    data.append('idPassportNumber', body.idPassportNumber);
    for (var i = 0; i < body.personalFiles.length; i++) {
      data.append('personalFiles', body.personalFiles[i]);
    }
    for (var i = 0; i < body.professionalFiles.length; i++) {
      data.append('professionalFiles', body.professionalFiles[i]);
    }
    if (body.profilePic) {
      data.append('profilePic', {
        uri: body.profilePic.uri,
        name: body.profilePic.filename,
        type: 'image/jpeg',
      });
    }
    data.append('type', 'BECOME_INDIVIDUAL_OWNER');

    await axios.post(`${API_URL}/expert-applications`, data, config);
    dispatch({ type: SIGNUP_EXPERT_SUCCESS, payload: 'Successfully Registered' });
  } catch (error) {
    dispatch({ type: SIGNUP_EXPERT_FAILED, payload: getErrorMessage(error) });
  }
};
