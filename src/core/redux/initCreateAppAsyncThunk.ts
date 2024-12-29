import { type AnyAction, createAsyncThunk, type Dispatch, type ThunkDispatch } from '@reduxjs/toolkit';
import { type AsyncThunkPayloadCreatorReturnValue, type GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { type IsUnknown } from '@reduxjs/toolkit/dist/tsHelpers';
import { type AxiosInstance } from 'axios';

type extractThunkConfig<Type> = Type extends GetThunkAPI<infer X> ? X : never;

export type InitCreateAppAsyncThunkDispatch<AppState, AppDispatch> = IsUnknown<
  AppDispatch,
  ThunkDispatch<AppState, unknown, AnyAction>,
  AppDispatch
>;

export const initCreateAppAsyncThunk = <
  AppState,
  AppDispatch extends Dispatch,
  AxiosInstancesInitializers extends Record<
    string,
    (dispatch: InitCreateAppAsyncThunkDispatch<AppState, AppDispatch>) => AxiosInstance
  >,
>(
  axiosInstances: AxiosInstancesInitializers,
) => {
  const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState;
    dispatch: AppDispatch;
  }>();

  type CreateAppAsyncThunkParameters<ReturnValue, Payload> = Parameters<
    typeof createAppAsyncThunk<ReturnValue, Payload>
  >;

  type TypePrefix<ReturnValue, Payload> = CreateAppAsyncThunkParameters<ReturnValue, Payload>[0];
  type PayloadCreator<ReturnValue, Payload> = CreateAppAsyncThunkParameters<ReturnValue, Payload>[1];
  type Options<ReturnValue, Payload> = CreateAppAsyncThunkParameters<ReturnValue, Payload>[2];

  type ThunkAPI<ReturnValue, Payload> = Parameters<PayloadCreator<ReturnValue, Payload>>[1];
  type ExtractedThunkConfig<ReturnValue, Payload> = extractThunkConfig<ThunkAPI<ReturnValue, Payload>>;

  const wrapper = <ReturnValue, Payload>(
    typePrefix: TypePrefix<ReturnValue, Payload>,
    payloadCreator: (
      payload: Payload,
      thunkAPI: ThunkAPI<ReturnValue, Payload> &
        Record<keyof AxiosInstancesInitializers, AxiosInstance> & { abortAllSignal: AbortController['signal'] },
    ) => AsyncThunkPayloadCreatorReturnValue<ReturnValue, ExtractedThunkConfig<ReturnValue, Payload>>,
    options?: Options<ReturnValue, Payload>,
  ): ReturnType<typeof createAppAsyncThunk<ReturnValue, Payload>> & {
    abortAll: AbortController['abort'];
  } => {
    let abortController = new AbortController();
    const thunk = createAppAsyncThunk<ReturnValue, Payload>(
      typePrefix,
      (payload, thunkAPI) => {
        const convertedAxiosInstances: Record<string, AxiosInstance> = {};

        Object.entries(axiosInstances).forEach(([key, value]) => {
          convertedAxiosInstances[key] = value(thunkAPI.dispatch);
        });

        return payloadCreator(payload, {
          ...thunkAPI,
          ...(convertedAxiosInstances as Record<keyof AxiosInstancesInitializers, AxiosInstance>),
          abortAllSignal: abortController.signal,
        });
      },
      options,
    );

    const enhancedThunk = thunk as typeof thunk & { abortAll: AbortController['abort'] };
    enhancedThunk.abortAll = () => {
      abortController.abort();
      abortController = new AbortController();
    };

    return enhancedThunk;
  };

  return wrapper;
};
