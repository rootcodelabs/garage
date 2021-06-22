export const PRODUCT_HUNT_SIGN_UP = 'PRODUCT_HUNT_SIGN_UP';
export const ENABLE = 'enable';

import { store } from '../App';
import { isProd } from '../constance';

export function isEnabledFeatureFlag(key: string) {
  const { featureFlag } = store.getState();
  const PREFIX = isProd ? 'PROD' : 'STAGE';
  const productHunt = featureFlag.flags[`${PREFIX}_${key}`];

  if (productHunt && productHunt.value === ENABLE) {
    return true;
  }
  return false;
}
export function isProductHuntSignUpEnabled() {
  // return isEnabledFeatureFlag(PRODUCT_HUNT_SIGN_UP);
  return false;
}
