import Sentry from '@sentry/react-native';

import { type LoggerConfig } from './types';

const createLogger = (config: LoggerConfig) => {
  Sentry.init(config.sentryConfig);

  const log = (...messages: any[]) => {
    const fullMessage = messages.map(message => JSON.stringify(message)).join(' ');
    Sentry.captureMessage(fullMessage);
    console.log(fullMessage);
  };

  const error = (...messages: any[]) => {
    const fullMessage = messages.map(message => JSON.stringify(message)).join(' ');
    Sentry.captureException(fullMessage);
    console.error(fullMessage);
  };

  return { log, error };
};

export default createLogger;
