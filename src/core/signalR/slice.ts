import { type HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { minToMilSec, secToMilSec } from '../../utils';
import { type Nullable } from '../../utils/typescript';
import {
  type createSignalRSliceArgs,
  type OptionalOptions,
  type SignalRReduxExternalState,
  type SignalRState,
} from './types';
import { signalRconsoleError, signalRconsoleInfo } from './utils';

export const sliceName = 'signalr';

export const createSignalRSlice = ({ options, listeners = [] }: createSignalRSliceArgs) => {
  const opts: Required<OptionalOptions> = {
    reconnectTimeout: secToMilSec(3),
    serverTimeout: secToMilSec(5),
    serverTimeoutWithoutReceivingMessages: minToMilSec(60),
  };

  if (options?.reconnectTimeout) {
    opts.reconnectTimeout = options.reconnectTimeout;
  }
  if (options?.serverTimeout) {
    opts.serverTimeout = options.serverTimeout;
  }
  if (options?.serverTimeoutWithoutReceivingMessages) {
    opts.serverTimeoutWithoutReceivingMessages = options.serverTimeoutWithoutReceivingMessages;
  }

  let signalRConnection: Nullable<HubConnection> = null;

  const initialState: SignalRState = {
    accessToken: '',
  };

  const slice = createSlice({
    name: sliceName,
    initialState: initialState,
    reducers: {
      updateSignalRAccessToken(state: SignalRState, action: PayloadAction<string>) {
        state.accessToken = action.payload;
      },
    },
  });

  // Thunks
  const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: SignalRReduxExternalState;
  }>();

  const connect = createAppAsyncThunk<void>(`${sliceName}/connect`, async (_, { getState, dispatch }) => {
    try {
      if (!(sliceName in getState())) {
        signalRconsoleError(`"${sliceName}" field was not found in redux state!`);
        return;
      }

      const start = async () => {
        signalRconsoleInfo('trying to connect...');
        if (signalRConnection === null) {
          return;
        }
        try {
          if (signalRConnection.state === HubConnectionState.Disconnected) {
            await signalRConnection.start();
          }
          signalRconsoleInfo('connected');
        } catch (error) {
          signalRconsoleError(`error in start(): ${error}`);
          setTimeout(start, opts.reconnectTimeout);
        }
      };

      signalRConnection = new HubConnectionBuilder()
        .withUrl(options.url, {
          withCredentials: true,
          accessTokenFactory: () => getState().signalr.accessToken,
          headers: {
            'X-Device-Id': '1', // TODO: Ask backend do we need it
          },
        })
        .configureLogging(LogLevel.None)
        .withServerTimeout(opts.serverTimeout)
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: context => {
            signalRconsoleInfo(`connection lost, reconnecting, reason: ${context.retryReason}`);
            return opts.reconnectTimeout;
          },
        })
        .build();

      signalRConnection.serverTimeoutInMilliseconds = opts.serverTimeoutWithoutReceivingMessages;

      signalRConnection.onreconnected(() => {
        signalRconsoleInfo('connection restored');
        start();
      });

      for (const listener of listeners) {
        signalRConnection.on(listener.methodName, (...resultsArr) => {
          listener.callback({ readOnlyState: getState(), dispatch }, ...resultsArr);
        });
      }

      await start();
    } catch (error) {
      signalRconsoleError(`Error in connect(): ${error}`);
    }
  });

  /**
   *
   * @param methodName
   * @returns
   */
  const createSignalRMethodThunk = <ReturnValue, Payload>(methodName: string) => {
    return createAppAsyncThunk<ReturnValue | undefined, Payload>(
      `${sliceName}/${methodName}`,
      async (payload, { rejectWithValue }) => {
        if (signalRConnection === null || signalRConnection.state !== HubConnectionState.Connected) {
          return undefined;
        }

        try {
          const result = await signalRConnection.invoke(methodName, ...(Array.isArray(payload) ? payload : [payload]));
          return result as ReturnValue;
        } catch (error) {
          signalRconsoleError(`${methodName} method error: ${error}`);
          return rejectWithValue(error);
        }
      },
    );
  };

  return {
    /**
     * Redux slice with signalR logic.
     */
    slice,
    /**
     * Can be used to create a redux-toolkit thunk that calls a method on the SignalR hub.
     */
    createSignalRMethodThunk,
    signalRThunks: {
      connect,
    },
  };
};
