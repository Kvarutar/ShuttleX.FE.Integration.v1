import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export type BottomWindowWithGestureProps = {
  visiblePart: React.ReactNode;
  hiddenPart: React.ReactNode;
  alerts?: ReactNode;
  style?: StyleProp<ViewStyle>;
  visiblePartStyles?: StyleProp<ViewStyle>;
  hiddenPartStyles?: StyleProp<ViewStyle>;
  hiddenPartContainerStyles?: StyleProp<ViewStyle>;
  hiddenPartButton?: ReactNode;
  setIsOpened?: (isOpened: boolean) => void;
  windowStyle?: StyleProp<ViewStyle>;
  withSeparator?: boolean;
};

export type BottomWindowWithGestureRef = {
  closeWindow: () => void;
  openWindow: () => void;
};
