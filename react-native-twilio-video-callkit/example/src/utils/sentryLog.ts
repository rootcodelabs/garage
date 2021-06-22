import * as Sentry from '@sentry/react-native';

import { ProfileType } from '../redux/profile/reducers';

export function setSentryUser(user: ProfileType, email: string) {
  try {
    Sentry.configureScope(scope => {
      scope.setUser({
        id: user.userId.toString(),
        username: user.name,
        email: email,
      });
    });
  } catch (error) {}
}

export function removeSentryUser() {
  try {
    Sentry.configureScope(scope => {
      scope.clear();
    });
  } catch (error) {}
}
