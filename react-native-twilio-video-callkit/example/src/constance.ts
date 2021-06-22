import { Platform } from 'react-native';

export const isProd = true;

export const API_URL = isProd ? 'https://api.serw.io/v1' : 'https://stage-api.serw.io/v1';
export const STRIPE_KEY = isProd
  ? 'pk_live_fWgBRZFLRuvqzJVz3v3TFLjz00cKmIG5hl'
  : 'pk_test_VG893b08JbV9Njp4S0sz6Q8x00M0WzlgIo';
export const DEFAULT_CURRENCY = {
  code: 'USD',
  symbol: '$',
};
export const APP_NAME = 'Expert Republic';
export const SENTRY_DNS = 'https://c0be75480d814425b8cba3177e3c7508@o386800.ingest.sentry.io/5221450';
export const SENTRY_URL = 'https://sentry.io/api/0/projects/rootcode/rootcode/user-feedback/';
export const NOTIFICATION_TYPES = {
  expert_calling: 'expert_calling',
  user_cut_call: 'user_cut_call',
  added_to_new_service: 'added_to_new_service',
  session_completed: 'session_completed',
  new_booking: 'new_booking',
  new_message: 'new_message',
  before_booking_auto_rejected: 'before_booking_auto_rejected',
  before_booking_start_alert: 'before_booking_start_alert',
  booking_accepted: 'booking_accepted',
  booking_rejected: 'booking_rejected',
};

export const PUBLIC_WEBSITE = 'https://expertrepublic.com';
export const FIREBASE_VIDEO_CALL = '/bookingCalls';
export const VIEW_TERMS_CONDITIONS_LINK = 'https://expertrepublic.com/terms/';
export const PUBLIC_SUPPORT_LINK = 'https://expertrepublic.com/support/';
export const BECOME_AN_EXPERT_LINK = 'https://expertrepublic.com/expert-signup/login/';
export const VIEW_PRIVACY_LINK = 'https://expertrepublic.com/privacy/';
export const BECOME_AN_ORGANIZATION_LINK = 'https://expertrepublic.com/expert-organization-signup/';

export const UNIVERAL_NUMBER_REGEX = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g;
export const IMAGE_PREFIX_URL = isProd
  ? 'https://serwdev.s3.us-east-2.amazonaws.com/'
  : 'https://serwstage.s3.us-east-2.amazonaws.com/';

export const PLACEHOLDER_USER_IMAGE = 'serw/static-app-contents/default-images/placeholder-user.png';
export const PLACEHOLDER_HORIZONTAL_IMAGE = 'serw/static-app-contents/default-images/placeholder-horizontal.png';
export const PLACEHOLDER_SQUARE_IMAGE = 'serw/static-app-contents/default-images/placeholder-square.png';

export const STORE_LINK =
  Platform.OS === 'ios'
    ? 'itms-apps://itunes.apple.com/us/app/apple-store/id1510429609?mt=8'
    : 'market://details?id=io.serw.app';

const ONE_SECOND_IN_MS = 1000;

export const VIBRATE_PATTERN = [1 * ONE_SECOND_IN_MS];

export type CALL_LOG_STATUS_ENUM =
  | 'CALLING'
  | 'CALL_ANSWERED'
  | 'CALL_REJECTED'
  | 'CALL_CUT_BEFORE_ANSWER'
  | 'CALL_ENDED'
  | 'ENDED_BY_SERVER'
  | 'ENDED_BY_APP';

export type DEEP_LINK_TYPES_ENUM = 'PROFILE' | 'SERVICE' | 'INVITE';
export const YEARS_OF_EXPERIENCES = [
  { label: '1 year', value: 1 },
  { label: '2 years', value: 2 },
  { label: '3 years', value: 3 },
  { label: '4 years', value: 4 },
  { label: '5 years', value: 5 },
  { label: '6 years', value: 6 },
  { label: '7 years', value: 7 },
  { label: '8 years', value: 8 },
  { label: '9 years', value: 9 },
  { label: '10 years', value: 10 },
  { label: '11 years', value: 11 },
  { label: '12 years', value: 12 },
  { label: '13 years', value: 13 },
  { label: '14 years', value: 14 },
  { label: '15 years', value: 15 },
  { label: '16 years', value: 16 },
  { label: '17 years', value: 17 },
  { label: '18 years', value: 18 },
  { label: '19 years', value: 19 },
  { label: '20 years', value: 20 },
  { label: '21 years', value: 21 },
  { label: '22 years', value: 22 },
  { label: '23 years', value: 23 },
  { label: '24 years', value: 24 },
  { label: '25 years', value: 25 },
  { label: '26 years', value: 26 },
  { label: '27 years', value: 27 },
  { label: '28 years', value: 28 },
  { label: '29 years', value: 29 },
  { label: '30 years', value: 30 },
  { label: '31 years', value: 31 },
  { label: '32 years', value: 32 },
  { label: '33 years', value: 33 },
  { label: '34 years', value: 34 },
  { label: '35 years', value: 35 },
  { label: '36 years', value: 36 },
  { label: '37 years', value: 37 },
  { label: '38 years', value: 38 },
  { label: '39 years', value: 39 },
  { label: '40 years', value: 40 },
];

export const callKitEnabled = false;
