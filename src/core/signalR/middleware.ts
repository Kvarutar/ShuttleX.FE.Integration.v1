import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { type AnyAction, type Dispatch, type MiddlewareAPI } from '@reduxjs/toolkit';

type Method<S, D> = {
  actionType: string;
  methodName: Parameters<HubConnection['invoke']>[0];
  callback?: ({ store, dispatch }: { store: S; dispatch: D }, result: any) => void;
};

type Listener<S, D> = {
  name: Parameters<HubConnection['on']>[0];
  callback: ({ store, dispatch }: { store: S; dispatch: D }, ...args: any[]) => void;
};

export class SignalR<S, D extends Dispatch<AnyAction>> {
  private _url: string;
  private _connectActionType: string;
  private _updateAccessTokenActionType: string;
  private _reconnectTimeout: number = 3 * 1000; // 3 seconds
  private _serverTimeout: number = 5 * 1000; // 5 seconds
  private _serverTimeoutWithoutReceivingMessages: number = 60 * 60 * 1000; // 1 hour

  private _accessToken: string = '';
  private _connection: HubConnection | null = null;
  private _methods: Method<S, D>[] = [];
  private _listeners: Listener<S, D>[] = [];

  constructor(
    url: SignalR<S, D>['_url'],
    connectActionType: SignalR<S, D>['_connectActionType'],
    updateAccessTokenActionType: SignalR<S, D>['_updateAccessTokenActionType'],
    opts?: {
      reconnectTimeout?: SignalR<S, D>['_reconnectTimeout'];
      serverTimeout?: SignalR<S, D>['_serverTimeout'];
      serverTimeoutWithoutReceivingMessages?: SignalR<S, D>['_serverTimeoutWithoutReceivingMessages'];
    },
  ) {
    this._url = url;
    this._connectActionType = connectActionType;
    this._updateAccessTokenActionType = updateAccessTokenActionType;
    if (opts?.reconnectTimeout) {
      this._reconnectTimeout = opts.reconnectTimeout;
    }
    if (opts?.serverTimeout) {
      this._serverTimeout = opts.serverTimeout;
    }
    if (opts?.serverTimeoutWithoutReceivingMessages) {
      this._serverTimeoutWithoutReceivingMessages = opts.serverTimeoutWithoutReceivingMessages;
    }
  }

  /**
   * Listens the SignalR hub method.
   * @param name The name of the SignalR hub method
   * @param callback The function that will be called when the hub sends a message
   */
  public listen(name: Listener<S, D>['name'], callback: Listener<S, D>['callback']) {
    this._listeners.push({ name, callback });
  }

  /**
   * Sets the listener of actionType to invoke method on the server,
   * arguments must be specified and passed in redux reducer as one or array
   * @param actionType Type of redux action
   * @param methodName Name of method on server
   * @param callback Called when the server indicates it has finished invoking the method
   */
  public on(
    actionType: Method<S, D>['actionType'],
    methodName: Method<S, D>['methodName'],
    callback?: Method<S, D>['callback'],
  ) {
    this._methods.push({ actionType, methodName, callback });
  }

  private connect(api: MiddlewareAPI<D, S>, next: Dispatch<AnyAction>, action: any) {
    const start = async () => {
      console.info('SignalR trying to connect...');
      if (!this._connection) {
        return next(action);
      }
      try {
        if (this._connection.state === HubConnectionState.Disconnected) {
          await this._connection.start();
        }
        console.info('SignalR connected');
      } catch (error) {
        console.error('Error in SignalR.start():', error);
        setTimeout(start, this._reconnectTimeout);
      }
    };

    this._connection = new HubConnectionBuilder()
      .withUrl(this._url, {
        withCredentials: true,
        accessTokenFactory: () => this._accessToken,
      })
      .configureLogging(LogLevel.None)
      .withServerTimeout(this._serverTimeout)
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: () => {
          console.info('SignalR connection lost, reconnecting...');
          return this._reconnectTimeout;
        },
      })
      .build();
    this._connection.serverTimeoutInMilliseconds = this._serverTimeoutWithoutReceivingMessages;

    this._connection.onreconnected(() => {
      console.info('SignalR connection restored');
      start();
    });

    for (const listener of this._listeners) {
      this._connection.on(listener.name, (...args) => {
        listener.callback({ store: api.getState(), dispatch: api.dispatch }, ...args);
      });
    }

    start();
  }

  /**
   * Compares the names of actions and if it finds a match, it invokes the method on the server
   */
  public async process(api: MiddlewareAPI<D, S>, next: Dispatch<AnyAction>, action: any) {
    if (action.type === this._connectActionType && this._connection === null) {
      this.connect(api, next, action);
    }
    if (action.type === this._updateAccessTokenActionType) {
      if (typeof action.payload === 'string') {
        this._accessToken = action.payload;
      } else {
        console.error('SignalR: payload of action that updates the access token must be a string');
      }
    }

    if (this._connection?.state === HubConnectionState.Connected) {
      for (const method of this._methods) {
        if (action.type === method.actionType) {
          try {
            const args = action.payload;
            const res = await this._connection.invoke(method.methodName, ...(Array.isArray(args) ? args : [args]));
            method.callback?.({ store: api.getState(), dispatch: api.dispatch }, res);
          } catch (error) {
            console.error(`SignalR ${method.methodName} method error:`, error);
          }
          break;
        }
      }
    }

    next(action);
  }
}
