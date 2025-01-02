import { useTranslation } from 'react-i18next';
import { type ImageStyle } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import BasicImage from './BasicImage';
import BasicXLImage from './BasicXLImage';
// import BusinessImage from './Business';
import ComfortPlusImage from './ComfortPlusImage';
import ElectricImage from './ElectricImage';

// TODO: Change tariffs names to the frontend keys
//TODO: Add 'Business' when work with it
export type TariffType = 'Basic' | 'BasicXL' | 'ComfortPlus' | 'Electric';

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
    //TODO: Add 'Business' when work with it
    // Business: {
    //   icon: BusinessImage,
    //   text: t('Tariffs_business'),
    // },
    Electric: {
      icon: ElectricImage,
      text: t('Tariffs_electric'),
    },
  };
  return icons;
};
