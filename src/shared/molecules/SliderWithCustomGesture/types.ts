import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { type SharedValue } from 'react-native-reanimated';

import { type SwipeButtonModes } from '../SwipeButton/types';

export type SliderWithCustomGestureProps = {
  onSwipeEnd: () => Promise<void> | void;
  sliderElement: React.ReactNode;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  rightToLeftSwipe?: boolean;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  wipeBlockStyle?: StyleProp<ViewStyle>;
  mode: SwipeButtonModes;
  setIsLoading?: (newState: boolean) => void;
  withWipeBlock?: boolean;
  isActive?: boolean;
  onSwipeStart?: () => void;
};

export type RightToLeftGestureType = {
  translateX: SharedValue<number>;
  lastTranslateX: SharedValue<number>;
  isAtMiddle: SharedValue<boolean>;
  innerSliderWidth: number;
  buttonWidth: number;
  mode: SwipeButtonModes;
  onSwipeEnd: () => void;
  onSwipeStart?: () => void;
};
