import axios, { type AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import DeviceInfo from 'react-native-device-info';
import Keychain from 'react-native-keychain';

import { type AxiosInstanceConfig } from './types';
import getTokens from './utils/getTokens';
import saveTokens from './utils/saveTokens';

const createAxiosInstance = ({
  url,
  retryConfig,
  onSignOut,
  refreshTokenUrl,
}: {
  url: string;
} & AxiosInstanceConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
  });

  if (retryConfig) {
    axiosRetry(instance, retryConfig);
  }

  if (refreshTokenUrl) {
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
            const deviceId = await DeviceInfo.getUniqueId();
            const response = await axios.post(refreshTokenUrl, {
              refreshToken,
              deviceId,
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
