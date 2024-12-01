import { type StyleProp, type ViewStyle } from 'react-native';

export enum LoadingSpinnerIconModes {
  Default = 'default',
  Mini = 'mini',
  Large = 'large',
}

export type CustomLoadingSpinnerIconSize = {
  size: number;
  strokeWidth: number;
};

export type LoadingSpinnerProps = {
  iconMode?: LoadingSpinnerIconModes | CustomLoadingSpinnerIconSize;
  startColor?: string;
  endColor?: string;
  style?: StyleProp<ViewStyle>;
};
