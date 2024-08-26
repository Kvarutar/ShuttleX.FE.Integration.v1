import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export enum ButtonModes {
  Mode1 = 'mode1',
  Mode2 = 'mode2',
  Mode3 = 'mode3',
  Mode4 = 'mode4',
}

export enum ButtonShapes {
  Circle = 'circle',
  Square = 'square',
}

export enum ButtonShadows {
  Weak = 'weak',
  Strong = 'strong',
}

export type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  mode?: ButtonModes;
  shape?: ButtonShapes;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  shadow?: ButtonShadows;
  disableShadow?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  innerSpacing?: number;
};
