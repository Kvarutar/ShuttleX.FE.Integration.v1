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
  buttonStyle?: StyleProp<ViewStyle>;
  mode?: ButtonModes;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  shadow?: ButtonShadows;
  disableShadow?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
};
