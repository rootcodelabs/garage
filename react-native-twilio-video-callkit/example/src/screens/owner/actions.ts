import { OwnerActionTypes, OwnerInterface } from './reducers';

import { API_URL } from '../../constance';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { axiosConfig, getErrorMessage } from '../../utils';

const PREFIX = '@OWNER_';

export const UPDATE_OWNER_PROFILE = PREFIX + 'UPDATE_OWNER_PROFILE';
export const UPDATE_OWNER_PROFILE_SUCCESS = PREFIX + 'UPDATE_OWNER_PROFILE_SUCCESS';
export const UPDATE_OWNER_PROFILE_FAILED = PREFIX + 'UPDATE_OWNER_PROFILE_FAILED';

export const GET_OWNERS_BY_CAT = PREFIX + 'GET_OWNERS_BY_CAT';
export const GET_OWNERS_BY_CAT_SUCCESS = PREFIX + 'GET_OWNERS_BY_CAT_SUCCESS';
export const GET_OWNERS_BY_CAT_FAILED = PREFIX + 'GET_OWNERS_BY_CAT_FAILED';

export const GET_OWNERS_FOR_CUSTOMER = PREFIX + 'GET_OWNERS_FOR_CUSTOMER';
export const GET_OWNERS_FOR_CUSTOMER_SUCCESS = PREFIX + 'GET_OWNERS_FOR_CUSTOMER_SUCCESS';
export const GET_OWNERS_FOR_CUSTOMER_FAILED = PREFIX + 'GET_OWNERS_FOR_CUSTOMER._FAILED';

export const GET_MY_BUSINESS_PROFILE = PREFIX + 'GET_MY_BUSINESS_PROFILE';
export const GET_MY_BUSINESS_PROFILE_SUCCESS = PREFIX + 'GET_MY_BUSINESS_PROFILE_SUCCESS';
export const GET_MY_BUSINESS_PROFILE_FAILED = PREFIX + 'GET_MY_BUSINESS_PROFILE_FAILED';

export const GET_MY_BUSINESS_EXPERTS = PREFIX + 'GET_MY_BUSINESS_EXPERTS';
export const GET_MY_BUSINESS_EXPERTS_SUCCESS = PREFIX + 'GET_MY_BUSINESS_EXPERTS_SUCCESS';
export const GET_MY_BUSINESS_EXPERTS_FAILED = PREFIX + 'GET_MY_BUSINESS_EXPERTS_FAILED';

export const UPDATE_MY_BUSINESS_EXPERTS = PREFIX + 'UPDATE_MY_BUSINESS_EXPERTS';
export const UPDATE_MY_BUSINESS_EXPERTS_SUCCESS = PREFIX + 'UPDATE_MY_BUSINESS_EXPERTS_SUCCESS';
export const UPDATE_MY_BUSINESS_EXPERTS_FAILED = PREFIX + 'UPDATE_MY_BUSINESS_EXPERTS_FAILED';

export const OWNER_CLEAR_ERRORS = PREFIX + 'OWNER_';

type defaultType = ThunkAction<void, OwnerActionTypes, unknown, Action<string>>;

export const clearOwnerErrors = (): defaultType => dispatch => {
  dispatch({ type: OWNER_CLEAR_ERRORS });
};

export const getOwnersByCategoryKey = (categoryKey: string): defaultType => async dispatch => {
  try {
    dispatch({ type: GET_OWNERS_BY_CAT });
    const config = await axiosConfig('customerAccessToken');
    const response = await axios.get(`${API_URL}/categories/${categoryKey}/owners`, config);
    const owners: OwnerInterface[] = response.data.owners || [];

    dispatch({ type: GET_OWNERS_BY_CAT_SUCCESS, payload: owners });
  } catch (error) {
    dispatch({ type: GET_OWNERS_BY_CAT_FAILED, payload: getErrorMessage(error) });
  }
};

export const getMyOwnerProfile = (): defaultType => async dispatch => {
  try {
    dispatch({ type: GET_MY_BUSINESS_PROFILE });
    const config = await axiosConfig('ownerAccessToken');
    const response = await axios.get(`${API_URL}/owners/me`, config);
    dispatch({ type: GET_MY_BUSINESS_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_MY_BUSINESS_PROFILE_FAILED, payload: getErrorMessage(error) });
  }
};

export const getMyOwnersExperts = (): defaultType => async dispatch => {
  try {
    dispatch({ type: GET_MY_BUSINESS_EXPERTS });
    const config = await axiosConfig('ownerAccessToken');
    const response = await axios.get(`${API_URL}/owners/me/experts`, config);
    const ownersExperts = response.data.experts;
    dispatch({ type: GET_MY_BUSINESS_EXPERTS_SUCCESS, payload: ownersExperts });
  } catch (error) {
    dispatch({ type: GET_MY_BUSINESS_EXPERTS_FAILED, payload: getErrorMessage(error) });
  }
};

export const getOwnersForCustomer = (searchTerm: string): defaultType => async dispatch => {
  try {
    dispatch({ type: GET_OWNERS_FOR_CUSTOMER });
    const response = await axios.get(`${API_URL}/owners?q=${searchTerm}&ownerType=BUSINESS`);
    dispatch({ type: GET_OWNERS_FOR_CUSTOMER_SUCCESS, payload: response.data.owners });
  } catch (error) {
    dispatch({ type: GET_OWNERS_FOR_CUSTOMER_FAILED, payload: getErrorMessage(error) });
  }
};

interface ProfileUpdateType {
  name: string;
  website: string | null;
  about: string | null;
  categoryKey: string | null;
  expertUserIds: string[];
}
export const updateOwnerProfile = (body: ProfileUpdateType): defaultType => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_OWNER_PROFILE });
    const config = await axiosConfig('ownerAccessToken');
    body.name ? body.name : null;
    body.website ? body.website : null;
    body.categoryKey ? body.categoryKey : null;
    body.about ? body.about : null;
    body.expertUserIds ? body.expertUserIds : null;
    await axios.put(`${API_URL}/owners/me`, body, config);

    await dispatch(getMyOwnerProfile());
    dispatch({ type: UPDATE_OWNER_PROFILE_SUCCESS, payload: 'Successfully Updated' });
  } catch (error) {
    dispatch({ type: UPDATE_OWNER_PROFILE_FAILED, payload: getErrorMessage(error) });
  }
};

export const updateMyOwnersExperts = (expertUserIds: string[]) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_MY_BUSINESS_EXPERTS });
    const config = await axiosConfig('ownerAccessToken');
    await axios.put(
      `${API_URL}/owners/me/experts`,
      {
        expertUserIds,
      },
      config,
    );
    dispatch({
      type: UPDATE_MY_BUSINESS_EXPERTS_SUCCESS,
      payload: 'Successfully updated experts in business',
    });
  } catch (error) {
    dispatch({ type: UPDATE_MY_BUSINESS_EXPERTS_FAILED, payload: getErrorMessage(error) });
  }
};
