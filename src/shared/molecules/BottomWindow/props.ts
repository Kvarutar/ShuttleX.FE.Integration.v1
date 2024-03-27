import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export type BottomWindowProps = {
  children: ReactNode;
  alerts?: ReactNode;
  style?: StyleProp<ViewStyle>;
  windowStyle?: StyleProp<ViewStyle>;
};
