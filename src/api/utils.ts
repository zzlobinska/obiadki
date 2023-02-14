import { AxiosError } from 'axios';
import _ from 'lodash';

import { Toasts } from 'components';

const labels = {};

export const fileUploadHeaders = {
  'Content-Type': 'multipart/form-data'
};

export const apiErrorHandler = (error: any) => {
  if (!error.response?.data || error.message === 'canceled') {
    return [];
  }

  try {
    return import.meta.env.REACT_APP_NODE_ENV !== 'production'
      ? [
          `Server: ${error.response.data.message}, (status: ${error.response.status})`
        ]
      : [error.response.data.message];
  } catch (error_) {
    console.error('apiErrorHandler', error_);
    return ['Wystąpił nieoczekiwany bląd'];
  }
};

export const isNetworkError = (err: AxiosError) =>
  err.isAxiosError && !err.response;

const NETWORK_ERROR_NOTIFY_DURATION = 10_000;

const notifyNetworkError = () => {
  Toasts.notifyDanger(
    [
      'Nie udało się skontaktować z serwerem aplikacji. Może to być tymczasowy problem lub serwer uległ awarii.'
    ],
    { duration: NETWORK_ERROR_NOTIFY_DURATION }
  );
};

export const throttledNotifyNetworkError = _.throttle(
  notifyNetworkError,
  NETWORK_ERROR_NOTIFY_DURATION,
  {
    trailing: false
  }
);
