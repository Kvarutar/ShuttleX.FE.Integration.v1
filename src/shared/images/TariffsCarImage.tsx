import { type ReactNode } from 'react';
import { type ImageStyle } from 'react-native';

import BasicXImage from './BasicXImage';
import BasicXLImage from './BasicXLImage';
import ComfortXImage from './ComfortXImage';
import PremiumXImage from './PremiumXImage';
import PremiumXLImage from './PremiumXLImage';
import TeslaXImage from './TeslaXImage';

export type TariffType = 'BasicX' | 'BasicXL' | 'ComfortX' | 'PremiumX' | 'PremiumXL' | 'TeslaX';

const images: Record<TariffType, ({ style }: { style?: ImageStyle }) => ReactNode> = {
  BasicX: BasicXImage,
  BasicXL: BasicXLImage,
  ComfortX: ComfortXImage,
  PremiumX: PremiumXImage,
  PremiumXL: PremiumXLImage,
  TeslaX: TeslaXImage,
};

const TariffsCarImage = ({ tariff, style }: { tariff: TariffType; style?: ImageStyle }) => images[tariff]({ style });

export default TariffsCarImage;
