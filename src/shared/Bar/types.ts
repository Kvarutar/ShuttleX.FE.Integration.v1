import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export type BarProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isActive: boolean;
};
