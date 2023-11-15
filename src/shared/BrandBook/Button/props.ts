import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { type ButtonModes } from '../../../core/themes/palettes/paletteTypes';

export type ButtonProps = {
  mode?: keyof ButtonModes;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  shadow?: 'weak' | 'strong';
  disableShadow?: boolean;
  disableRipple?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
};
