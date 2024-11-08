import { isAxiosError } from 'axios';

import { type NetworkErrorDetails, type NetworkErrorsBodies, NetworkErrorsStatuses } from './types';

const getNetworkErrorInfo = (error: any): NetworkErrorDetails & { body: NetworkErrorsBodies } => {
  if (isAxiosError(error) && error.response) {
    const code = error.response.status;
    switch (code) {
      case 401:
        return {
          status: NetworkErrorsStatuses.TokenExpired,
          code,
          body: '',
        };
      default:
        return {
          status: NetworkErrorsStatuses.NoExistings,
          code,
          body: error.response?.data.Message,
        };
    }
  }

  return {
    status: NetworkErrorsStatuses.NoExistings,
    code: 404,
    body: 'Something went wrong. Try again later',
  };
};

export default getNetworkErrorInfo;
