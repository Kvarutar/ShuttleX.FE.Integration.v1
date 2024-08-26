import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export enum ButtonV1Modes {
  Mode1 = 'mode1',
  Mode2 = 'mode2',
  Mode3 = 'mode3',
  Mode4 = 'mode4',
}

export enum ButtonV1Shapes {
  Circle = 'circle',
  Square = 'square',
}

export enum ButtonV1Shadows {
  Weak = 'weak',
  Strong = 'strong',
}

export type ButtonV1Props = {
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  mode?: ButtonV1Modes;
  shape?: ButtonV1Shapes;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  shadow?: ButtonV1Shadows;
  disableShadow?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  innerSpacing?: number;
};
