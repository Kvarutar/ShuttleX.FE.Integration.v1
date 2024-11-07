import { type HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { createAsyncThunk, createSlice, type Dispatch, type PayloadAction } from '@reduxjs/toolkit';

const sliceName = 'signalr';

type SignalRState = {
  accessToken: string;
};

type RequiredOptions = {
  url: string;
};

type OptionalOptions = {
  reconnectTimeout?: number;
  serverTimeout?: number;
  serverTimeoutWithoutReceivingMessages?: number;
};

type Listener<D> = {
  /**
   * @param methodName The name of the SignalR hub method to listen to
   */
  methodName: Parameters<HubConnection['on']>[0];
  /**
   * @param callback The function that will be called when the hub sends a message
   */
  callback: ({ readOnlyState, dispatch }: { readOnlyState: any; dispatch: D }, ...resultsArr: any[]) => void;
};

export const createSignalRSlice = ({
  options,
  listeners = [],
}: {
  options: RequiredOptions & OptionalOptions;
  /**
   * Listeners of SignalR hub methods.
   */
  listeners?: Listener<Dispatch>[];
}) => {
  const opts: Required<OptionalOptions> = {
    reconnectTimeout: 3 * 1000, // 3 seconds
    serverTimeout: 5 * 1000, // 5 seconds
    serverTimeoutWithoutReceivingMessages: 60 * 60 * 1000, // 1 hour
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

  let signalRConnection: HubConnection | null = null;

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
    state: Record<typeof sliceName, SignalRState>;
  }>();

  const connect = createAppAsyncThunk<void>(`${sliceName}/connect`, async (_, { getState, dispatch }) => {
    try {
      if (!(sliceName in getState())) {
        console.error(`"${sliceName}" field was not found in redux state!`);
        return;
      }

      const start = async () => {
        console.info('SignalR trying to connect...');
        if (signalRConnection === null) {
          return;
        }
        try {
          if (signalRConnection.state === HubConnectionState.Disconnected) {
            await signalRConnection.start();
          }
          console.info('SignalR connected');
        } catch (error) {
          console.error('Error in SignalR.start():', error);
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
          nextRetryDelayInMilliseconds: () => {
            console.info('SignalR connection lost, reconnecting...');
            return opts.reconnectTimeout;
          },
        })
        .build();

      signalRConnection.serverTimeoutInMilliseconds = opts.serverTimeoutWithoutReceivingMessages;

      signalRConnection.onreconnected(() => {
        console.info('SignalR connection restored');
        start();
      });

      for (const listener of listeners) {
        signalRConnection.on(listener.methodName, (...resultsArr) => {
          listener.callback({ readOnlyState: getState(), dispatch }, ...resultsArr);
        });
      }

      await start();
    } catch (error) {
      console.error('Error in SignalR.connect():', error);
    }
  });

  /**
   *
   * @param methodName
   * @returns
   */
  const createSignalRMethodThunk = <ReturnValue, Payload>(methodName: string) => {
    return createAppAsyncThunk<ReturnValue, Payload>(
      `${sliceName}/${methodName}`,
      async (payload, { rejectWithValue }) => {
        try {
          const result = await signalRConnection?.invoke(methodName, ...(Array.isArray(payload) ? payload : [payload]));
          return result as ReturnValue;
        } catch (error) {
          console.error(`SignalR ${methodName} method error:`, error);
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
