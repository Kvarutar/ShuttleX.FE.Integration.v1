import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export enum ButtonModes {
  Mode1 = 'mode1',
  Mode2 = 'mode2',
  Mode3 = 'mode3',
}

export enum ButtonShadows {
  Weak = 'weak',
  Strong = 'strong',
}

export type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  mode?: ButtonModes;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  borderRadius?: number;
  shadow?: ButtonShadows;
  disableShadow?: boolean;
  disableRipple?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
};
