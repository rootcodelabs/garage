import {
  BOOKING_CLEAR_MSG,
  CREATE_BOOKING,
  CREATE_BOOKING_FAILED,
  CREATE_BOOKING_SUCCESS,
  GET_EXPERT_UPCOMING_BOOKINGS,
  GET_EXPERT_UPCOMING_BOOKINGS_SUCCESS,
  GET_EXPERT_UPCOMING_BOOKINGS_FAILED,
  GET_EXPERT_COMPLETED_BOOKINGS,
  GET_EXPERT_COMPLETED_BOOKINGS_SUCCESS,
  GET_EXPERT_COMPLETED_BOOKINGS_FAILED,
  GET_EXPERT_PENDING_BOOKINGS,
  GET_EXPERT_PENDING_BOOKINGS_SUCCESS,
  GET_EXPERT_PENDING_BOOKINGS_FAILED,
  GET_CUSTOMER_UPCOMING_BOOKINGS,
  GET_CUSTOMER_UPCOMING_BOOKINGS_SUCCESS,
  GET_CUSTOMER_UPCOMING_BOOKINGS_FAILED,
  GET_CUSTOMER_COMPLETED_BOOKINGS,
  GET_CUSTOMER_COMPLETED_BOOKINGS_SUCCESS,
  GET_CUSTOMER_COMPLETED_BOOKINGS_FAILED,
  GET_CUSTOMER_PENDING_BOOKINGS,
  GET_CUSTOMER_PENDING_BOOKINGS_SUCCESS,
  GET_CUSTOMER_PENDING_BOOKINGS_FAILED,
  GET_BOOKING_BY_ID,
  GET_BOOKING_BY_ID_FAILED,
  GET_BOOKING_BY_ID_SUCCESS,
  PUT_BOOKING_RATING,
  PUT_BOOKING_RATING_FAILED,
  PUT_BOOKING_RATING_SUCCESS,
  UPDATE_BOOKING_AS_EXPERT,
  UPDATE_BOOKING_AS_EXPERT_FAILED,
  UPDATE_BOOKING_AS_EXPERT_SUCCESS,
  CLEAR_EXPERT_UPCOMING_BOOKINGS,
  CLEAR_EXPERT_COMPLETED_BOOKINGS,
  CLEAR_CUSTOMER_UPCOMING_BOOKINGS,
  CLEAR_CUSTOMER_COMPLETED_BOOKINGS,
} from './actions';

// import { ProfileType } from '../profile/reducers';
// import { ServiceType } from '../service/reducers';
// import { ExpertType } from '../experts/reducers';

export interface BookingType {
  successfulCalls: boolean;
  bookingId: string | number;
  status: 'COMPLETED' | 'ACCEPTED' | 'PENDING_ACCEPTANCE';
  currency: string;
  durationMinutes: number;
  price: number;
  rating: number;
  notes: string | null;
  expertUserId: string | number;
  createdDate: string;
  completedDate: string | null;
  paymentRef: string | null;
  scheduledTime: Date;
  // service: ServiceType;
  // customer: null | ProfileType;
  // expert: ExpertType;
  estimatedCallTimeMinutes: number;
  callLogs: [];
}

interface DefaultAction {
  type: string;
  payload: {
    isLoading: boolean;
    bookingError: string | null;
  };
}

interface GetExpertUpcomingBookingsAction {
  type: typeof GET_EXPERT_UPCOMING_BOOKINGS_SUCCESS;
  payload: BookingType[];
}

interface GetExpertCompletedBookings {
  type: typeof GET_EXPERT_COMPLETED_BOOKINGS_SUCCESS;
  payload: BookingType[];
}

interface GetCustomerUpcomingBookings {
  type: typeof GET_CUSTOMER_UPCOMING_BOOKINGS_SUCCESS;
  payload: BookingType[];
}

interface GetCustomerCompletedBookings {
  type: typeof GET_CUSTOMER_COMPLETED_BOOKINGS_SUCCESS;
  payload: BookingType[];
}

export interface BookingInitialState {
  expertUpcomingBookings: BookingType[];
  expertCompletedBookings: BookingType[];
  expertPendingBookings: BookingType[];
  customerUpcomingBookings: BookingType[];
  customerCompletedBookings: BookingType[];
  customerPendingBookings: BookingType[];
  booking?: BookingType | null;
  isLoading: boolean;
  bookingError: string | null;
  bookingUpdateSuccessMessage: string | null;
  bookingSuccessMessage: string | null;
  ratingError: string | null;
  ratingSuccessMessage: string | null;
}

export const initialState: BookingInitialState = {
  expertUpcomingBookings: [],
  expertCompletedBookings: [],
  expertPendingBookings: [],
  customerUpcomingBookings: [],
  customerCompletedBookings: [],
  customerPendingBookings: [],
  isLoading: false,
  booking: null,
  bookingError: null,
  bookingUpdateSuccessMessage: null,
  bookingSuccessMessage: null,

  ratingError: null,
  ratingSuccessMessage: null,
};

export type BookingActionTypes =
  | GetExpertUpcomingBookingsAction
  | GetExpertCompletedBookings
  | GetCustomerUpcomingBookings
  | GetCustomerCompletedBookings
  | DefaultAction;
const authReducer = (state: BookingInitialState = initialState, action: any) => {
  switch (action.type) {
    case GET_EXPERT_UPCOMING_BOOKINGS:
      return { ...state, isLoading: true, bookingError: null };
    case GET_EXPERT_UPCOMING_BOOKINGS_SUCCESS:
      let expertUpcomingBookingsIds = new Set(state.expertUpcomingBookings.map(item => item.bookingId));
      return {
        ...state,
        isLoading: false,
        expertUpcomingBookings: [
          ...state.expertUpcomingBookings,
          ...action.payload.filter((item: BookingType) => !expertUpcomingBookingsIds.has(item.bookingId)),
        ],
      };
    case GET_EXPERT_UPCOMING_BOOKINGS_FAILED:
      return { ...state, isLoading: false, bookingError: action.payload };

    case GET_EXPERT_COMPLETED_BOOKINGS:
      return { ...state, isLoading: true, bookingError: null };
    case GET_EXPERT_COMPLETED_BOOKINGS_SUCCESS:
      let expertCompletedBookingsIds = new Set(state.expertCompletedBookings.map(item => item.bookingId));
      return {
        ...state,
        isLoading: false,
        expertCompletedBookings: [
          ...state.expertCompletedBookings,
          ...action.payload.filter((item: BookingType) => !expertCompletedBookingsIds.has(item.bookingId)),
        ],
      };
    case GET_EXPERT_COMPLETED_BOOKINGS_FAILED:
      return { ...state, isLoading: false, bookingError: action.payload };

    case GET_EXPERT_PENDING_BOOKINGS:
      return { ...state, isLoading: true, bookingError: null };
    case GET_EXPERT_PENDING_BOOKINGS_SUCCESS:
      return { ...state, isLoading: false, expertPendingBookings: action.payload };
    case GET_EXPERT_PENDING_BOOKINGS_FAILED:
      return { ...state, isLoading: false, bookingError: action.payload };

    case GET_CUSTOMER_UPCOMING_BOOKINGS:
      return { ...state, isLoading: true, bookingError: null };
    case GET_CUSTOMER_UPCOMING_BOOKINGS_SUCCESS:
      let customerUpcomingBookingsIds = new Set(state.customerUpcomingBookings.map(item => item.bookingId));
      return {
        ...state,
        isLoading: false,
        customerUpcomingBookings: [
          ...state.customerUpcomingBookings,
          ...action.payload.filter((item: BookingType) => !customerUpcomingBookingsIds.has(item.bookingId)),
        ],
      };
    case GET_CUSTOMER_UPCOMING_BOOKINGS_FAILED:
      return { ...state, isLoading: false, bookingError: action.payload };

    case GET_CUSTOMER_COMPLETED_BOOKINGS:
      return { ...state, isLoading: true, bookingError: null };
    case GET_CUSTOMER_COMPLETED_BOOKINGS_SUCCESS:
      let customerCompletedBookingsIds = new Set(state.customerCompletedBookings.map(item => item.bookingId));
      return {
        ...state,
        isLoading: false,
        customerCompletedBookings: [
          ...state.customerCompletedBookings,
          ...action.payload.filter((item: BookingType) => !customerCompletedBookingsIds.has(item.bookingId)),
        ],
      };
    case GET_CUSTOMER_COMPLETED_BOOKINGS_FAILED:
      return { ...state, isLoading: false, bookingError: action.payload };

    case GET_CUSTOMER_PENDING_BOOKINGS:
      return { ...state, isLoading: true, bookingError: null };
    case GET_CUSTOMER_PENDING_BOOKINGS_SUCCESS:
      return { ...state, isLoading: false, customerPendingBookings: action.payload };
    case GET_CUSTOMER_PENDING_BOOKINGS_FAILED:
      return { ...state, isLoading: false, bookingError: action.payload };

    case BOOKING_CLEAR_MSG:
      return {
        ...state,
        booking: null,
        bookingError: null,
        bookingSuccessMessage: null,
        bookingUpdateSuccessMessage: null,
      };
    case CREATE_BOOKING:
      return { ...state, isLoading: true, bookingError: null, bookingSuccessMessage: null };
    case CREATE_BOOKING_SUCCESS:
      return { ...state, isLoading: false, bookingSuccessMessage: action.payload };
    case CREATE_BOOKING_FAILED:
      return { ...state, isLoading: false, bookingError: action.payload };

    case UPDATE_BOOKING_AS_EXPERT:
      return { ...state, isLoading: true, bookingError: null, bookingUpdateSuccessMessage: null };
    case UPDATE_BOOKING_AS_EXPERT_SUCCESS:
      return { ...state, isLoading: false, bookingUpdateSuccessMessage: action.payload };
    case UPDATE_BOOKING_AS_EXPERT_FAILED:
      return { ...state, isLoading: false, bookingError: action.payload };

    case PUT_BOOKING_RATING:
      return { ...state, isLoading: true, ratingError: null, ratingSuccessMessage: null };
    case PUT_BOOKING_RATING_SUCCESS:
      return { ...state, isLoading: false, ratingSuccessMessage: action.payload };
    case PUT_BOOKING_RATING_FAILED:
      return { ...state, isLoading: false, ratingError: action.payload };

    case GET_BOOKING_BY_ID:
      return { ...state, isLoading: true, booking: null, bookingError: null };
    case GET_BOOKING_BY_ID_SUCCESS:
      return { ...state, isLoading: false, booking: action.payload };
    case GET_BOOKING_BY_ID_FAILED:
      return { ...state, isLoading: false, bookingError: action.payload };

    case CLEAR_EXPERT_UPCOMING_BOOKINGS:
      return { ...state, expertUpcomingBookings: action.payload };
    case CLEAR_EXPERT_COMPLETED_BOOKINGS:
      return { ...state, expertCompletedBookings: action.payload };
    case CLEAR_CUSTOMER_UPCOMING_BOOKINGS:
      return { ...state, customerUpcomingBookings: action.payload };
    case CLEAR_CUSTOMER_COMPLETED_BOOKINGS:
      return { ...state, customerCompletedBookings: action.payload };

    default:
      return state;
  }
};

export default authReducer;
