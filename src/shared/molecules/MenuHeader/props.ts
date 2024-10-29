import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { type ButtonProps } from '../../atoms/Button/v2/props';

export type MenuHeaderTypes = {
  onMenuPress: () => void;
  onNotificationPress: () => void;
  children?: ReactNode;
  leftButtonProps?: ButtonProps;
  style: StyleProp<ViewStyle>;
};
