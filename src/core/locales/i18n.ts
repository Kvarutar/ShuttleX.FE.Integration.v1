import { createInstance } from 'i18next';

import resources from './i18n.config';

const i18nIntegration = createInstance({
  compatibilityJSON: 'v3',
  resources,
  supportedLngs: ['en', 'ru'],
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18nIntegration.init();

export default i18nIntegration;
