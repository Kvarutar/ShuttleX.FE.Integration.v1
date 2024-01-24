import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export enum BarModes {
  Active = 'active',
  Default = 'default',
  Disabled = 'disabled',
}

export type BarProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  mode?: BarModes;
};
