import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export type SafeAreaViewProps = {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  withTransparentBackground?: boolean;
};
