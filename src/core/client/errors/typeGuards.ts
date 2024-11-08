import { type NetworkErrorDetails, type NetworkErrorsBodies, NetworkErrorsStatuses } from './types';

type NetworkError = NetworkErrorDetails & { body: NetworkErrorsBodies };

export const isTokenExpiredError = (
  errorResponse: NetworkError,
): errorResponse is NetworkErrorDetails & { body: string } => {
  return errorResponse.status === NetworkErrorsStatuses.TokenExpired;
};

export const isNoExistingsError = (
  errorResponse: NetworkError,
): errorResponse is NetworkErrorDetails & { body: string } => {
  return errorResponse.status === NetworkErrorsStatuses.NoExistings;
};
