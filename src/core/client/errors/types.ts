export enum NetworkErrorsStatuses {
  NoExistings = 'no_existing',
  TokenExpired = 'token_expired',
}

export type NetworkErrorsBodies = string;

export type NetworkErrorDetails = {
  status: NetworkErrorsStatuses;
  code: number;
};

export type NetworkErrorDetailsWithBody<T> = Omit<NetworkErrorDetails, 'status'> & { status: string; body: T };
