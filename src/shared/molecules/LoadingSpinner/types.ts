import { type StyleProp, type ViewStyle } from 'react-native';

export enum LoadingSpinnerIconModes {
  Default = 'default',
  Mini = 'mini',
  Large = 'large',
}

export type CustomIconSize = {
  size: number;
  strokeWidth: number;
};

export type LoadingSpinnerProps = {
  iconMode?: LoadingSpinnerIconModes | CustomIconSize;
  startColor?: string;
  endColor?: string;
  style?: StyleProp<ViewStyle>;
};
