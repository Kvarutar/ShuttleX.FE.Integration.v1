import { type ImageStyle, type StyleProp, type ViewStyle } from 'react-native';

import { type TariffType } from '../Tariffs/TariffsCarImage';

export type CarAndWheelImages = {
  car: ({ style }: { style?: ImageStyle }) => JSX.Element;
  wheel: ({ style }: { style?: ImageStyle }) => JSX.Element;
};

export type AnimatedCarImageProps = {
  tariffType: TariffType | 'Default';
  containerStyle?: StyleProp<ViewStyle>;
  animationDurationInMilSec?: number;
  startDelayInMilSec?: number;
  withAnimation?: boolean;
  leaveInStartPosition?: boolean;
};
