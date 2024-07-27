import axios from 'axios';
import { type IAxiosRetryConfig } from 'axios-retry';
import axiosRetry from 'axios-retry';

const createAxiosInstance = ({ url, retryConfig }: { url: string; retryConfig?: IAxiosRetryConfig }) => {
  const instance = axios.create({
    baseURL: url,
  });

  if (retryConfig) {
    axiosRetry(instance, retryConfig);
  }

  //TODO: add token interceptors

  return instance;
};

export default createAxiosInstance;
