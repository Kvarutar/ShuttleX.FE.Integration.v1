import axiosRetry from 'axios-retry';

const axiosLongPollingRetryConfig = {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
};

export default axiosLongPollingRetryConfig;
