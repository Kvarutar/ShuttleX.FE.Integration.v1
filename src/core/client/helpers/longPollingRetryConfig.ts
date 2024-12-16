import { type AxiosError } from 'axios';
import axiosRetry from 'axios-retry';

const axiosLongPollingRetryConfig = {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: AxiosError) => {
    if (error.response?.status === 408) {
      return true;
    }
    if (error.response?.status && error.response.status >= 500 && error.response.status <= 599) {
      return true;
    }
    return false;
  },
};

export default axiosLongPollingRetryConfig;
