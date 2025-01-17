import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

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
};
