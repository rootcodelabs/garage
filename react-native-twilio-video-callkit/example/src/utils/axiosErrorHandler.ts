import { AxiosError } from 'axios';
import _ from 'lodash';
import { logger } from './logger';

export function getErrorMessage(error: AxiosError, defaultError?: string): string {
  const errorMessage = _.get(error, 'response.data');
  if (__DEV__ && error) {
    if (error.response) {
      const { config, status } = error.response;
      logger.info(status, config.url, error.response);
    } else {
      logger.info('getErrorMessage ', error);
    }
  }
  if (errorMessage) {
    // if (error.response && error.response.status == 401) {
    //   store.dispatch(logout());
    // }
    if (_.isString(errorMessage.message)) {
      return errorMessage.message;
    }
    if (_.isString(errorMessage)) {
      return errorMessage;
    }
  } else {
    logger.error('error', error);
  }

  return defaultError || 'Something went wrong';
}
