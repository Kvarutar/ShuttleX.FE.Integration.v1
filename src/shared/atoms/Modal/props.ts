import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export type ModalProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};
