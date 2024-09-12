import { type StyleProp, type ViewStyle } from 'react-native';

export type SliderWithCustomGestureProps = {
  onSwipeEnd: () => Promise<void> | void;
  sliderElement: React.ReactNode;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};
