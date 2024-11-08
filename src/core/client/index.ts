import axios, { type AxiosInstance } from 'axios';
import { type IAxiosRetryConfig } from 'axios-retry';
import axiosRetry from 'axios-retry';
import Keychain from 'react-native-keychain';

import getTokens from './utils/getTokens';
import saveTokens from './utils/saveTokens';

const createAxiosInstance = ({
  url,
  retryConfig,
  withAuth = true,
  onSignOut,
}: {
  url: string;
  retryConfig?: IAxiosRetryConfig;
  withAuth?: boolean;
  onSignOut?: (refreshToken: string | null) => void;
}): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
  });

  if (retryConfig) {
    axiosRetry(instance, retryConfig);
  }

  if (withAuth) {
    instance.interceptors.request.use(
      async config => {
        const token = (await getTokens()).accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = (await getTokens()).refreshToken;
          try {
            //TODO: add device id
            const response = await axios.post(`${url}/auth/refresh`, {
              refreshToken,
              deviceId: 'string',
            });
            const { accessToken, refreshToken: newRefreshToken } = response.data;

            await saveTokens({ accessToken, refreshToken: newRefreshToken });

            instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            await Keychain.resetGenericPassword();

            onSignOut?.(refreshToken);

            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  return instance;
};

export default createAxiosInstance;
