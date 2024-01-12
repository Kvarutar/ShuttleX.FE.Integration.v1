import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export type AlertProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isSwipeable?: boolean;
  onClose?: () => void;
};

export type AlertDescendantProps = Omit<AlertProps, 'children'>;
