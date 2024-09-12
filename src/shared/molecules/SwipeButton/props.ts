import { type StyleProp, type ViewStyle } from 'react-native';

export enum SwipeButtonModes {
  Confirm = 'confirm',
  Decline = 'decline',
}

export type SwipeButtonProps = {
  mode: SwipeButtonModes;
  onSwipeEnd: () => void;
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
};
