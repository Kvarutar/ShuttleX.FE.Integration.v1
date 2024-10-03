import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export enum SwipeButtonModes {
  Confirm = 'confirm',
  Decline = 'decline',
  Finish = 'finish',
}

export type SwipeButtonProps = {
  mode: SwipeButtonModes;
  onSwipeEnd: () => void;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export type SwipeButtonColors = {
  startColor: string;
  endColor: string;
  buttonBgColor: string;
};
