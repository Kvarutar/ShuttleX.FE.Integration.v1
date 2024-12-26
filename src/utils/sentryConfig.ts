import Sentry from '@sentry/react-native';

export const getDefaultDevSentryConfig = (dsn: string): Sentry.ReactNativeOptions => ({
  dsn,
  enableAutoSessionTracking: true,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  _experiments: {
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  },
  integrations: [
    Sentry.dedupeIntegration(),
    Sentry.mobileReplayIntegration({
      maskAllText: false,
      maskAllImages: false,
      maskAllVectors: false,
    }),
  ],
  normalizeDepth: 10,
});

export const getDefaultProdSentryConfig = (dsn: string): Sentry.ReactNativeOptions => ({
  dsn,
  enableAutoSessionTracking: true,
  tracesSampleRate: 0.2,
  profilesSampleRate: 0.2,
  _experiments: {
    replaysSessionSampleRate: 0.5,
    replaysOnErrorSampleRate: 0.5,
  },
  integrations: [
    Sentry.dedupeIntegration(),
    Sentry.mobileReplayIntegration({
      maskAllText: true,
      maskAllImages: true,
      maskAllVectors: true,
    }),
  ],
  normalizeDepth: 5,
  debug: false,
});
