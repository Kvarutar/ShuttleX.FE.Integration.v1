import tariffsEn from '../../shared/icons/Tariffs/translations/en.json';
import { en, ru } from './translations';

const resources = {
  en: {
    translation: { ...en, ...tariffsEn },
  },
  ru: {
    translation: ru,
  },
};

export default resources;
