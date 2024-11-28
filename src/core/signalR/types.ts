import { type HubConnection } from '@microsoft/signalr';
import { type Dispatch } from '@reduxjs/toolkit';

import { type sliceName } from './slice';

export type SignalRState = {
  accessToken: string;
  isConnected: boolean;
};

export type SignalRReduxExternalState = Record<typeof sliceName, SignalRState>;

export type RequiredOptions = {
  url: string;
};

export type OptionalOptions = {
  reconnectTimeout?: number;
  serverTimeout?: number;
  serverTimeoutWithoutReceivingMessages?: number;
};

export type Listener<D> = {
  /**
   * @param methodName The name of the SignalR hub method to listen to
   */
  methodName: Parameters<HubConnection['on']>[0];
  /**
   * @param callback The function that will be called when the hub sends a message
   */
  callback: ({ readOnlyState, dispatch }: { readOnlyState: any; dispatch: D }, ...resultsArr: any[]) => void;
};

export type createSignalRSliceArgs = {
  options: RequiredOptions & OptionalOptions;
  /**
   * Listeners of SignalR hub methods.
   */
  listeners?: Listener<Dispatch>[];
};
