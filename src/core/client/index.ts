import axios from 'axios';
import { type IAxiosRetryConfig } from 'axios-retry';
import axiosRetry from 'axios-retry';

const createAxiosInstance = ({ url, retryConfig }: { url?: string; retryConfig?: IAxiosRetryConfig }) => {
  const instance = axios.create({
    baseURL: url ?? 'https://4d4e13d2-119c-4f9c-b83a-c27f0bd9c90a.mock.pstmn.io/api/v1.0',
  });

  if (retryConfig) {
    axiosRetry(instance, retryConfig);
  }

  //TODO: add token interceptors

  return instance;
};

export default createAxiosInstance;
