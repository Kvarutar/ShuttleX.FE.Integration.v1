import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export enum CircleButtonModes {
  Mode1 = 'mode1',
  Mode2 = 'mode2',
  Mode3 = 'mode3',
  Mode4 = 'mode4',
  Mode5 = 'mode5',
  Mode6 = 'mode6',
}

export enum SquareButtonModes {
  Mode1 = 'mode1',
  Mode2 = 'mode2',
  Mode3 = 'mode3',
  Mode4 = 'mode4',
  Mode5 = 'mode5',
}

export enum ButtonShapes {
  Circle = 'circle',
  Square = 'square',
}

export enum ButtonShadows {
  Weak = 'weak',
  Strong = 'strong',
}

export enum ButtonSizes {
  S = 's',
  M = 'm',
  L = 'l',
}

export type ButtonAnimationProps = {
  time: number;
  children: React.ReactNode;
  onAnimationEnd: () => void;
};

export type ButtonAnimationRef = {
  restartAnimation: () => void;
};

export type ButtonRef = {
  restartMode6Animation: () => void;
};

export type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  circleSubContainerStyle?: StyleProp<ViewStyle>;
  mode?: SquareButtonModes | CircleButtonModes;
  shape?: ButtonShapes;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  shadow?: ButtonShadows;
  disableShadow?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  circleMode6Time?: number;
  innerSpacing?: number;
  size?: ButtonSizes;
  withCircleMode1Border?: boolean;
  withBorder?: boolean;
};
