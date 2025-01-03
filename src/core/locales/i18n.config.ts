import tariffsEn from '../../shared/icons/Tariffs/translations/en.json';
import tariffsUk from '../../shared/icons/Tariffs/translations/uk.json';
import { en, uk } from './translations';

const resources = {
  en: {
    translation: { ...en, ...tariffsEn },
  },
  uk: {
    translation: { ...uk, ...tariffsUk },
  },
  ru: {
    translation: { ...uk, ...tariffsUk },
  },
};

export default resources;
