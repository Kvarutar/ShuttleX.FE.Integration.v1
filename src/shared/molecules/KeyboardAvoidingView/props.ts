import { type ReactNode } from 'react';
import {
  type KeyboardAvoidingViewProps as KeyboardAvoidingViewBaseProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type KeyboardAvoidingViewProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  iosOptions?: {
    behavior?: KeyboardAvoidingViewBaseProps['behavior'];
  };
};

export type AndroidKeyboardAvoidingViewProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};
