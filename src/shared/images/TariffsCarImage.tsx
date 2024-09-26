import { type ReactNode } from 'react';
import { type ImageStyle } from 'react-native';

import BasicImage from './BasicImage';
import BasicXLImage from './BasicXLImage';
import BusinessImage from './Business';
import ComfortPlusImage from './ComfortPlusImage';
import EcoImage from './EcoImage';

// TODO: Change tariffs names to the frontend keys
export type TariffType = 'Basic' | 'BasicXL' | 'ComfortPlus' | 'Business' | 'Eco';

const images: Record<TariffType, ({ style }: { style?: ImageStyle }) => ReactNode> = {
  Basic: BasicImage,
  BasicXL: BasicXLImage,
  Eco: EcoImage,
  ComfortPlus: ComfortPlusImage,
  Business: BusinessImage,
};

const TariffsCarImage = ({ tariff, style }: { tariff: TariffType; style?: ImageStyle }) => images[tariff]({ style });

export default TariffsCarImage;
