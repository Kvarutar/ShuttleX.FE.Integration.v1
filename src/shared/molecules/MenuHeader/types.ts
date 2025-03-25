import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { type ButtonProps } from '../../atoms/Button/types';

export type MenuHeaderTypes = {
  onMenuPress: () => void;
  children?: ReactNode;
  leftButtonProps?: ButtonProps;
  style?: StyleProp<ViewStyle>;
  rightButton?: ReactNode;
  leftButtonIcon?: ReactNode;
};
