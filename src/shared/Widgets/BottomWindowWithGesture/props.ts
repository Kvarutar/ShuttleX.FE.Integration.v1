import { type StyleProp, type ViewStyle } from 'react-native';

export type BottomWindowWithGestureProps = {
  visiblePart: React.ReactNode;
  hiddenPart: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  visiblePartStyles?: StyleProp<ViewStyle>;
  hiddenPartStyles?: StyleProp<ViewStyle>;
  setIsOpened?: (isOpened: boolean) => void;
};

export type BottomWindowWithGestureRef = {
  closeWindow: () => void;
};
