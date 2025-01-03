import { type ReactNode } from 'react';
import { type NativeMethods, type StyleProp, type ViewStyle } from 'react-native';

export type BottomWindowProps = {
  children: ReactNode;
  additionalTopContent?: ReactNode;
  alerts?: ReactNode;
  showAlerts?: boolean;
  style?: StyleProp<ViewStyle>;
  windowStyle?: StyleProp<ViewStyle>;
  withShade?: boolean;
};

export type BottomWindowRef = {
  measure: NativeMethods['measure'];
};
