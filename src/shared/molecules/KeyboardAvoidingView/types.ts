import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export type KeyboardAvoidingViewAndroidMode = 'adjustPan' | 'adjustResize';
export type KeyboardAvoidingViewMode = 'normal' | 'inverted';

export type KeyboardAvoidingViewProps = {
  children: ReactNode;
  mode?: KeyboardAvoidingViewMode;
  style?: StyleProp<ViewStyle>;
};

export type AndroidKeyboardAvoidingViewProps = {
  children: ReactNode;
  androidMode: KeyboardAvoidingViewAndroidMode;
  style?: StyleProp<ViewStyle>;
};
