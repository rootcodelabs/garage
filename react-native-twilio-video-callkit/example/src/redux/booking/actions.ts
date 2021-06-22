import axios from 'axios';
import { Action } from 'redux';
import { API_URL } from '../../constance';
import { axiosConfig, getErrorMessage, getPaymentInfoMyCreditBalance } from '../../utils';
import { BookingActionTypes } from './reducers';
// import { PaymentCard } from '../payment/reducers';
// import { ServiceType } from '../service/reducers';
import { ThunkAction } from 'redux-thunk';
// import { getProfile } from '../profile/actions';

const PREFIX = '@BOOKING_';

export const GET_EXPERT_UPCOMING_BOOKINGS = PREFIX + 'GET_EXPERT_UPCOMING_BOOKINGS';
export const GET_EXPERT_UPCOMING_BOOKINGS_SUCCESS = PREFIX + 'GET_EXPERT_UPCOMING_BOOKINGS_SUCCESS';
export const GET_EXPERT_UPCOMING_BOOKINGS_FAILED = PREFIX + 'GET_EXPERT_UPCOMING_BOOKINGS_FAILED';

export const GET_EXPERT_COMPLETED_BOOKINGS = PREFIX + 'GET_EXPERT_COMPLETED_BOOKINGS';
export const GET_EXPERT_COMPLETED_BOOKINGS_SUCCESS = PREFIX + 'GET_EXPERT_COMPLETED_BOOKINGS_SUCCESS';
export const GET_EXPERT_COMPLETED_BOOKINGS_FAILED = PREFIX + 'GET_EXPERT_COMPLETED_BOOKINGS_FAILED';

export const GET_EXPERT_PENDING_BOOKINGS = PREFIX + 'GET_EXPERT_PENDING_BOOKINGS';
export const GET_EXPERT_PENDING_BOOKINGS_SUCCESS = PREFIX + 'GET_EXPERT_PENDING_BOOKINGS_SUCCESS';
export const GET_EXPERT_PENDING_BOOKINGS_FAILED = PREFIX + 'GET_EXPERT_PENDING_BOOKINGS_FAILED';

export const GET_CUSTOMER_UPCOMING_BOOKINGS = PREFIX + 'GET_CUSTOMER_UPCOMING_BOOKINGS';
export const GET_CUSTOMER_UPCOMING_BOOKINGS_SUCCESS = PREFIX + 'GET_CUSTOMER_UPCOMING_BOOKINGS_SUCCESS';
export const GET_CUSTOMER_UPCOMING_BOOKINGS_FAILED = PREFIX + 'GET_CUSTOMER_UPCOMING_BOOKINGS_FAILED';

export const GET_CUSTOMER_COMPLETED_BOOKINGS = PREFIX + 'GET_CUSTOMER_COMPLETED_BOOKINGS';
export const GET_CUSTOMER_COMPLETED_BOOKINGS_SUCCESS = PREFIX + 'GET_CUSTOMER_COMPLETED_BOOKINGS_SUCCESS';
export const GET_CUSTOMER_COMPLETED_BOOKINGS_FAILED = PREFIX + 'GET_CUSTOMER_COMPLETED_BOOKINGS_FAILED';

export const GET_CUSTOMER_PENDING_BOOKINGS = PREFIX + 'GET_CUSTOMER_PENDING_BOOKINGS';
export const GET_CUSTOMER_PENDING_BOOKINGS_SUCCESS = PREFIX + 'GET_CUSTOMER_PENDING_BOOKINGS_SUCCESS';
export const GET_CUSTOMER_PENDING_BOOKINGS_FAILED = PREFIX + 'GET_CUSTOMER_PENDING_BOOKINGS_FAILED';

export const GET_BOOKING_BY_ID = PREFIX + 'GET_BOOKING_BY_ID';
export const GET_BOOKING_BY_ID_SUCCESS = PREFIX + 'GET_BOOKING_BY_ID_SUCCESS';
export const GET_BOOKING_BY_ID_FAILED = PREFIX + 'GET_BOOKING_BY_ID_FAILED';

export const CREATE_BOOKING = PREFIX + 'CREATE_BOOKING';
export const CREATE_BOOKING_SUCCESS = PREFIX + 'CREATE_BOOKING_SUCCESS';
export const CREATE_BOOKING_FAILED = PREFIX + 'CREATE_BOOKING_FAILED';

export const UPDATE_BOOKING_AS_EXPERT = PREFIX + 'UPDATE_BOOKING_AS_EXPERT';
export const UPDATE_BOOKING_AS_EXPERT_SUCCESS = PREFIX + 'UPDATE_BOOKING_AS_EXPERT_SUCCESS';
export const UPDATE_BOOKING_AS_EXPERT_FAILED = PREFIX + 'UPDATE_BOOKING_AS_EXPERT_FAILED';

export const PUT_BOOKING_RATING = PREFIX + 'PUT_BOOKING_RATING';
export const PUT_BOOKING_RATING_SUCCESS = PREFIX + 'PUT_BOOKING_RATING_SUCCESS';
export const PUT_BOOKING_RATING_FAILED = PREFIX + 'PUT_BOOKING_RATING_FAILED';

export const BOOKING_CLEAR_MSG = PREFIX + 'BOOKING_CLEAR_MSG';

export const CLEAR_EXPERT_UPCOMING_BOOKINGS = PREFIX + 'CLEAR_EXPERT_UPCOMING_BOOKINGS';
export const CLEAR_EXPERT_COMPLETED_BOOKINGS = PREFIX + 'CLEAR_EXPERT_COMPLETED_BOOKINGS';
export const CLEAR_CUSTOMER_UPCOMING_BOOKINGS = PREFIX + 'CLEAR_CUSTOMER_UPCOMING_BOOKINGS';
export const CLEAR_CUSTOMER_COMPLETED_BOOKINGS = PREFIX + 'CLEAR_CUSTOMER_COMPLETED_BOOKINGS';

type defaultType = ThunkAction<void, BookingActionTypes, unknown, Action<string>>;

export const clearBookingMessages = (): defaultType => dispatch => {
  dispatch({ type: BOOKING_CLEAR_MSG });
};

export const getExpertUpcomingBookings = (skip?: number): defaultType => async dispatch => {
  let fields =
    'bookings[].bookingId,bookings[].status,bookings[].currency,bookings[].durationMinutes,bookings[].price,bookings[].notes,bookings[].completedDate,bookings[].expertUserId,bookings[].paymentType,bookings[].paymentRef,bookings[].creditsSpent,bookings[].createdDate,bookings[].expert,bookings[].scheduledTime,bookings[].service,bookings[].customer,bookings[].rating,bookings[].successfulCalls';
  try {
    dispatch({ type: GET_EXPERT_UPCOMING_BOOKINGS });
    const config = await axiosConfig('expertAccessToken');
    const response = await axios.get(
      `${API_URL}/bookings?status=ACCEPTED&fields=${fields}&skip=${skip || 0}&take=10`,
      config,
    );

    dispatch({
      type: GET_EXPERT_UPCOMING_BOOKINGS_SUCCESS,
      payload: response.data.bookings || [],
    });
  } catch (error) {
    dispatch({ type: GET_EXPERT_UPCOMING_BOOKINGS_FAILED, payload: getErrorMessage(error) });
  }
};

export const getExpertCompletedBookings = (skip?: number): defaultType => async dispatch => {
  let fields =
    'bookings[].bookingId,bookings[].status,bookings[].currency,bookings[].durationMinutes,bookings[].price,bookings[].notes,bookings[].completedDate,bookings[].expertUserId,bookings[].paymentType,bookings[].paymentRef,bookings[].creditsSpent,bookings[].createdDate,bookings[].expert,bookings[].scheduledTime,bookings[].service,bookings[].customer,bookings[].rating,bookings[].successfulCalls';
  try {
    dispatch({ type: GET_EXPERT_COMPLETED_BOOKINGS });
    const config = await axiosConfig('expertAccessToken');
    const response = await axios.get(
      `${API_URL}/bookings?status=COMPLETED&fields=${fields}&skip=${skip || 0}&take=10`,
      config,
    );

    dispatch({ type: GET_EXPERT_COMPLETED_BOOKINGS_SUCCESS, payload: response.data.bookings || [] });
  } catch (error) {
    dispatch({ type: GET_EXPERT_COMPLETED_BOOKINGS_FAILED, payload: getErrorMessage(error) });
  }
};

export const getExpertPendingBookings = (): defaultType => async dispatch => {
  let fields =
    'bookings[].bookingId,bookings[].status,bookings[].currency,bookings[].durationMinutes,bookings[].price,bookings[].notes,bookings[].completedDate,bookings[].expertUserId,bookings[].paymentType,bookings[].paymentRef,bookings[].creditsSpent,bookings[].createdDate,bookings[].expert,bookings[].scheduledTime,bookings[].service,bookings[].customer,bookings[].rating,bookings[].successfulCalls';
  try {
    dispatch({ type: GET_EXPERT_PENDING_BOOKINGS });
    const config = await axiosConfig('expertAccessToken');
    const response = await axios.get(`${API_URL}/bookings?status=PENDING_ACCEPTANCE&fields=${fields}`, config);

    dispatch({
      type: GET_EXPERT_PENDING_BOOKINGS_SUCCESS,
      payload: response.data.bookings,
    });
  } catch (error) {
    dispatch({ type: GET_EXPERT_PENDING_BOOKINGS_FAILED, payload: getErrorMessage(error) });
  }
};

export const getCustomerUpcomingBookings = (skip?: number): defaultType => async dispatch => {
  let fields =
    'bookings[].bookingId,bookings[].status,bookings[].currency,bookings[].durationMinutes,bookings[].price,bookings[].notes,bookings[].completedDate,bookings[].expertUserId,bookings[].paymentType,bookings[].paymentRef,bookings[].creditsSpent,bookings[].createdDate,bookings[].expert,bookings[].scheduledTime,bookings[].service,bookings[].customer,bookings[].rating,bookings[].successfulCalls';
  try {
    dispatch({ type: GET_CUSTOMER_UPCOMING_BOOKINGS });
    const config = await axiosConfig('customerAccessToken');
    const response = await axios.get(
      `${API_URL}/bookings?status=ACCEPTED&fields=${fields}&skip=${skip || 0}&take=10`,
      config,
    );

    dispatch({
      type: GET_CUSTOMER_UPCOMING_BOOKINGS_SUCCESS,
      payload: response.data.bookings || [],
    });
  } catch (error) {
    dispatch({ type: GET_CUSTOMER_UPCOMING_BOOKINGS_FAILED, payload: getErrorMessage(error) });
  }
};

export const getCustomerCompletedBookings = (skip?: number): defaultType => async dispatch => {
  let fields =
    'bookings[].bookingId,bookings[].status,bookings[].currency,bookings[].durationMinutes,bookings[].price,bookings[].notes,bookings[].completedDate,bookings[].expertUserId,bookings[].paymentType,bookings[].paymentRef,bookings[].creditsSpent,bookings[].createdDate,bookings[].expert,bookings[].scheduledTime,bookings[].service,bookings[].customer,bookings[].rating,bookings[].successfulCalls';
  try {
    dispatch({ type: GET_CUSTOMER_COMPLETED_BOOKINGS });
    const config = await axiosConfig('customerAccessToken');
    const response = await axios.get(
      `${API_URL}/bookings?status=COMPLETED&fields=${fields}&skip=${skip || 0}&take=10`,
      config,
    );

    dispatch({
      type: GET_CUSTOMER_COMPLETED_BOOKINGS_SUCCESS,
      payload: response.data.bookings || [],
    });
  } catch (error) {
    dispatch({ type: GET_CUSTOMER_COMPLETED_BOOKINGS_FAILED, payload: getErrorMessage(error) });
  }
};

export const getCustomerPendingBookings = (): defaultType => async dispatch => {
  let fields =
    'bookings[].bookingId,bookings[].status,bookings[].currency,bookings[].durationMinutes,bookings[].price,bookings[].notes,bookings[].completedDate,bookings[].expertUserId,bookings[].paymentType,bookings[].paymentRef,bookings[].creditsSpent,bookings[].createdDate,bookings[].expert,bookings[].scheduledTime,bookings[].service,bookings[].customer,bookings[].rating,bookings[].successfulCalls';
  try {
    dispatch({ type: GET_CUSTOMER_PENDING_BOOKINGS });
    const config = await axiosConfig('customerAccessToken');
    const response = await axios.get(`${API_URL}/bookings?status=PENDING_ACCEPTANCE&fields=${fields}`, config);

    dispatch({
      type: GET_CUSTOMER_PENDING_BOOKINGS_SUCCESS,
      payload: response.data.bookings,
    });
  } catch (error) {
    dispatch({ type: GET_CUSTOMER_PENDING_BOOKINGS_FAILED, payload: getErrorMessage(error) });
  }
};

export const getBookingById = (
  bookingId: string | number,
  tokenType: 'expertAccessToken' | 'customerAccessToken',
): defaultType => async dispatch => {
  try {
    dispatch({ type: GET_BOOKING_BY_ID });
    const config = await axiosConfig(tokenType);
    const response = await axios.get(`${API_URL}/bookings/${bookingId}`, config);
    dispatch({
      type: GET_BOOKING_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GET_BOOKING_BY_ID_FAILED, payload: getErrorMessage(error) });
  }
};

export const postBookingRating = (
  bookingId: string,
  rating: number,
  description: string,
): defaultType => async dispatch => {
  try {
    dispatch({ type: PUT_BOOKING_RATING });
    const config = await axiosConfig('customerAccessToken');
    await axios.post(
      `${API_URL}/bookings/${bookingId}/rating`,
      {
        rating: rating || 0,
        description: description || null,
      },
      config,
    );

    dispatch({
      type: PUT_BOOKING_RATING_SUCCESS,
      payload: 'Thank you very much for rating...',
    });
  } catch (error) {
    dispatch({ type: PUT_BOOKING_RATING_FAILED, payload: getErrorMessage(error) });
  }
};



export const updateBookingStatusAsExpert = (
  bookingId: string | number,
  status: 'COMPLETED' | 'ACCEPTED' | 'REJECTED',
  notes: string,
): defaultType => async dispatch => {
  try {
    dispatch({ type: UPDATE_BOOKING_AS_EXPERT });
    const config = await axiosConfig('expertAccessToken');
    await axios.put(
      `${API_URL}/bookings/${bookingId}`,
      {
        status,
        notes,
      },
      config,
    );

    dispatch(clearExpertUpcomingBookings());
    dispatch(clearExpertCompletedBookings());
    await dispatch(getExpertUpcomingBookings());
    dispatch(getExpertCompletedBookings());

    dispatch({ type: UPDATE_BOOKING_AS_EXPERT_SUCCESS, payload: 'Successfully updated' });
  } catch (error) {
    dispatch({ type: UPDATE_BOOKING_AS_EXPERT_FAILED, payload: getErrorMessage(error) });
  }
};

export const clearExpertUpcomingBookings = () => (dispatch: any) => {
  dispatch({ type: CLEAR_EXPERT_UPCOMING_BOOKINGS, payload: [] });
};

export const clearExpertCompletedBookings = () => (dispatch: any) => {
  dispatch({ type: CLEAR_EXPERT_COMPLETED_BOOKINGS, payload: [] });
};

export const clearCustomerUpcomingBookings = () => (dispatch: any) => {
  dispatch({ type: CLEAR_CUSTOMER_UPCOMING_BOOKINGS, payload: [] });
};

export const clearCustomerCompletedBookings = () => (dispatch: any) => {
  dispatch({ type: CLEAR_CUSTOMER_COMPLETED_BOOKINGS, payload: [] });
};
