import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export type BottomWindowWithGestureProps = {
  visiblePart?: React.ReactNode;
  hiddenPart?: React.ReactNode;
  alerts?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  visiblePartStyle?: StyleProp<ViewStyle>;
  hiddenPartStyle?: StyleProp<ViewStyle>;
  hiddenPartContainerStyle?: StyleProp<ViewStyle>;
  hiddenPartButton?: ReactNode;
  opened?: boolean;
  setIsOpened?: (isOpened: boolean) => void;
  bottomWindowStyle?: StyleProp<ViewStyle>;
  withHiddenPartScroll?: boolean;
  withShade?: boolean;
  shadeStyle?: StyleProp<ViewStyle>;
  hiddenPartWrapperStyle?: StyleProp<ViewStyle>;
  maxHeight?: number;
  withDraggable?: boolean;
};

export type BottomWindowWithGestureRef = {
  closeWindow: () => void;
  openWindow: () => void;
};
