import { type ReactNode } from 'react';
import { type ViewStyle } from 'react-native';

export type BlurProps = {
  children?: ReactNode;
  style?: ViewStyle;
  animationDuration?: number;
};
