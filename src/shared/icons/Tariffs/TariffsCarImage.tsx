import { useTranslation } from 'react-i18next';
import { type ImageStyle } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import BasicImage from './BasicImage';
import BasicXLImage from './BasicXLImage';
import BusinessElite from './BusinessElite';
import BusinessX from './BusinessX';
import ComfortEco from './ComfortEco';
// import BusinessImage from './Business';
import ComfortPlusImage from './ComfortPlusImage';
import ElectricImage from './ElectricImage';

// TODO: Change tariffs names to the frontend keys
//TODO: Add 'Business' when work with it
export type TariffType =
  | 'Basic'
  | 'BasicXL'
  | 'ComfortPlus'
  | 'Electric'
  | 'BusinessX'
  | 'BusinessElite'
  | 'ComfortEco';

export type TariffIconData = {
  icon: ({ style }: { style?: ImageStyle }) => JSX.Element;
  text: string;
};

export const useTariffsIcons = (): Record<TariffType, TariffIconData> => {
  const { t } = useTranslation(undefined, { i18n: i18nIntegration });
  const icons: Record<TariffType, TariffIconData> = {
    Basic: {
      icon: BasicImage,
      text: t('Tariffs_basic'),
    },
    BasicXL: {
      icon: BasicXLImage,
      text: t('Tariffs_basicXL'),
    },
    ComfortPlus: {
      icon: ComfortPlusImage,
      text: t('Tariffs_comfortPlus'),
    },
    Electric: {
      icon: ElectricImage,
      text: t('Tariffs_electric'),
    },
    BusinessElite: {
      icon: BusinessElite,
      text: t('Tariffs_businessElite'),
    },
    BusinessX: {
      icon: BusinessX,
      text: t('Tariffs_businessX'),
    },
    ComfortEco: {
      icon: ComfortEco,
      text: t('Tariffs_comfortEco'),
    },
  };
  return icons;
};
