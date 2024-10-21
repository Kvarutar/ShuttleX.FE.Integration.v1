import tariffsEn from '../../shared/icons/Tariffs/translations/en.json';
import tariffsUk from '../../shared/icons/Tariffs/translations/uk.json';
import { en, ru, uk } from './translations';

const resources = {
  en: {
    translation: { ...en, ...tariffsEn },
  },
  ru: {
    translation: ru,
  },
  uk: {
    translation: { ...uk, ...tariffsUk },
  },
};

export default resources;
