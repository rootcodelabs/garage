import appReducer, { AppInitialState } from './app/reducers';
import authReducer, { AuthInitialState } from './auth/reducers';
import bookingReducer, { BookingInitialState } from './booking/reducers';
import callLogsReducer, { CallLogInitialState } from './callLogs/reducers';
// import categoryReducer, { CategoryInitialState } from './category/reducers';
// import expertsReducer, { ExpertsInitialState } from './experts/reducers';
import ownerReducer, { OwnerInitialState } from './owner/reducers';
// import paymentReducer, { PaymentInitialState } from './payment/reducers';
import profileReducer, { ProfileInitialState } from './profile/reducers';
import pushNotificationReducer, { PushNotificationInitialState } from './pushNotification/reducers';
// import serviceReducer, { ServiceInitialState } from './service/reducers';
// import uploadReducer, { UploadInitialState } from './upload/reducers';
// import currencyReducer, { CurrencyInitialState } from './currency/reducers';
// import earningsReducer, { EarningsInitialState } from './earnings/reducers';
// import payoutsReducer, { PayoutsInitialState } from './payouts/reducers';
// import bankDetailsReducer, { BankDetailsInitialState } from './bankDetails/reducers';
// import ratingsReducer, { RatingsInitialState } from './ratings/reducers';
// import chatReducer, { ChatInitialState } from './chat/reducers';
// import SearchReducer, { SearchAllInitialState } from './search/reducers';
// import DeepLinkReducer, { DeepLinkState } from './deepLink/reducers';
// import FeatureFlagReducer, { FeatureFlagInitialState } from './featureFlag/reducers';
// import timezonesReducer, { TimezonesInitialState } from './timeZones/reducers';

import { LOGOUT } from './auth/actions';
import { combineReducers } from 'redux';

export interface RootState {
  auth: AuthInitialState;
  profile: ProfileInitialState;
  app: AppInitialState;
  // category: CategoryInitialState;
  // service: ServiceInitialState;
  owner: OwnerInitialState;
  booking: BookingInitialState;
  // upload: UploadInitialState;
  // experts: ExpertsInitialState;
  // payment: PaymentInitialState;
  pushNotification: PushNotificationInitialState;
  callLog: CallLogInitialState;
  // earnings: EarningsInitialState;
  // payouts: PayoutsInitialState;
  // bankDetails: BankDetailsInitialState;
  // ratings: RatingsInitialState;
  // currency: CurrencyInitialState;
  // chat: ChatInitialState;
  // search: SearchAllInitialState;
  // deepLink: DeepLinkState;
  // featureFlag: FeatureFlagInitialState;
  // timezones: TimezonesInitialState;
}

const mainReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  app: appReducer,
  // category: categoryReducer,
  // service: serviceReducer,
  owner: ownerReducer,
  booking: bookingReducer,
  // upload: uploadReducer,
  // experts: expertsReducer,
  pushNotification: pushNotificationReducer,
  // payment: paymentReducer,
  callLog: callLogsReducer,
  // earnings: earningsReducer,
  // payouts: payoutsReducer,
  // bankDetails: bankDetailsReducer,
  // ratings: ratingsReducer,
  // currency: currencyReducer,
  // chat: chatReducer,
  // search: SearchReducer,
  // deepLink: DeepLinkReducer,
  // featureFlag: FeatureFlagReducer,
  // timezones: timezonesReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return mainReducer(state, action);
};

export default rootReducer;
