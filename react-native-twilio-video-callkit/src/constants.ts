const isProd = true;

export const PLACEHOLDER_USER_IMAGE = 'serw/static-app-contents/default-images/placeholder-user.png';
export const PLACEHOLDER_HORIZONTAL_IMAGE = 'serw/static-app-contents/default-images/placeholder-horizontal.png';
export const PLACEHOLDER_SQUARE_IMAGE = 'serw/static-app-contents/default-images/placeholder-square.png';

export const IMAGE_PREFIX_URL = isProd
  ? 'https://serwdev.s3.us-east-2.amazonaws.com/'
  : 'https://serwstage.s3.us-east-2.amazonaws.com/';

export type CALL_LOG_STATUS_ENUM =
  | 'CALLING'
  | 'CALL_ANSWERED'
  | 'CALL_REJECTED'
  | 'CALL_CUT_BEFORE_ANSWER'
  | 'CALL_ENDED'
  | 'ENDED_BY_SERVER'
  | 'ENDED_BY_APP';

export type DEEP_LINK_TYPES_ENUM = 'PROFILE' | 'SERVICE' | 'INVITE';

export const callKitEnabled = false;
