import { store } from '../App';
import { ProfileType } from '../../src/redux/profile/reducers';

export function isAuthenticated(): boolean {
  const tokens = store.getState().auth.tokens;
  if (tokens) {
    return true;
  }
  return false;
}

export function isExpertOrOwner(): boolean {
  const profile = store.getState().profile.profile;
  if (profile) {
    return profile.isOwner || profile.isExpert;
  }
  return false;
}

export function isCustomerOnly(): boolean {
  return !isExpertOrOwner();
}

export function isOwner(): boolean {
  const profile = store.getState().profile.profile;
  if (profile && profile.isOwner) {
    return true;
  }
  return false;
}

export function isOwnerByType(type: 'BUSINESS' | 'INDIVIDUAL'): boolean {
  const profile = store.getState().profile.profile;
  if (profile && profile.isOwner) {
    if (profile.ownerProfile.type === type) {
      return true;
    }
  }
  return false;
}
export function canUseCreditBalance(price: number): boolean {
  const creditBalance = getMyCreditBalance();
  if (creditBalance === 0) {
    return false;
  }
  if (creditBalance >= price) {
    return true;
  }
  return false;
}

export interface GetPaymentInfoMyCreditBalanceI {
  servicePrice: number;
  paymentMethod: 'STRIPE_AND_APP_CREDITS' | 'STRIPE' | 'APP_CREDITS';
  payByCredits: number;
  payByStripe: number;
}
export function getPaymentInfoMyCreditBalance(servicePrice: number): GetPaymentInfoMyCreditBalanceI {
  const creditBalance = getMyCreditBalance();
  if (creditBalance >= servicePrice) {
    return {
      servicePrice,
      paymentMethod: 'APP_CREDITS',
      payByCredits: servicePrice,
      payByStripe: 0,
    };
  } else if (creditBalance < servicePrice && creditBalance !== 0) {
    return {
      servicePrice,
      paymentMethod: 'STRIPE_AND_APP_CREDITS',
      payByCredits: creditBalance,
      payByStripe: servicePrice - creditBalance,
    };
  } else {
    return {
      servicePrice,
      paymentMethod: 'STRIPE',
      payByCredits: 0,
      payByStripe: servicePrice,
    };
  }
}

export function getMyCreditBalance(): number {
  const profile = store.getState().profile.profile;
  if (profile && profile.customerProfile) {
    return profile.customerProfile.creditBalance;
  }
  return 0;
}

export function getCurrentUserId(): string | null {
  // console.log('my state ? ', store.getState());
  const profile = store.getState().profile.profile;
  if (profile && profile.userId) {
    return profile.userId;
  }
  return null;
}

export function getCurrentCustomProfile(): ProfileType | null {
  const profile = store.getState().profile;
  if (profile && profile.profile && profile.profile.customerProfile) {
    return profile.profile.customerProfile;
  }
  return null;
}

export function getCurrentEmail(): string | null {
  const profile = store.getState().profile.profile;
  if (profile && profile.email) {
    return profile.email;
  }
  return null;
}

export function isEmailVerified(): boolean | null {
  const profile = store.getState().profile.profile;
  if (profile) {
    return profile.isVerified;
  }
  return null;
}

export function getCurrentUserType(): string | null {
  if (isOwner()) {
    return 'owner';
  } else if (isExpertOrOwner()) {
    return 'expert';
  }
  return 'customer';
}

export function getCurrentBusinessType(): string | null {
  if (isOwner()) {
    const profile = store.getState().profile.profile;
    if (profile && profile.ownerProfile) {
      return profile.ownerProfile.type;
    }
  }
  return null;
}

export const getAuthCredsByType = (
  type: 'customerAccessToken' | 'ownerAccessToken' | 'expertAccessToken',
): string | null => {
  const tokens = store.getState().auth.tokens;
  // console.log('token type ? ', type);
  // console.log('tokens ? ', tokens);
  if (tokens) {
    const result = tokens[type];
    return result;
  }
  return null;
};
