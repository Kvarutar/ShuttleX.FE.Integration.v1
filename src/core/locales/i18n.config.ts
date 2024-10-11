import tariffsEn from '../../shared/icons/Tariffs/translations/en.json';
import { en, ru, uk } from './translations';

const resources = {
  en: {
    translation: { ...en, ...tariffsEn },
  },
  ru: {
    translation: ru,
  },
  uk: {
    translation: uk,
  },
};

export default resources;
