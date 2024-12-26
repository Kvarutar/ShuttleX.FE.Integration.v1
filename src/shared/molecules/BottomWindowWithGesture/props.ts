import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SharedValue } from 'react-native-reanimated';

export type BottomWindowWithGestureProps = {
  visiblePart?: ReactNode;
  hiddenPart?: ReactNode;
  headerElement?: ReactNode;
  additionalTopContent?: ReactNode;
  alerts?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  visiblePartStyle?: StyleProp<ViewStyle>;
  hiddenPartStyle?: StyleProp<ViewStyle>;
  hiddenPartContainerStyle?: StyleProp<ViewStyle>;
  headerWrapperStyle?: StyleProp<ViewStyle>;
  hiddenPartButton?: ReactNode;
  opened?: boolean;
  setIsOpened?: (isOpened: boolean) => void;
  bottomWindowStyle?: StyleProp<ViewStyle>;
  withHiddenPartScroll?: boolean;
  withVisiblePartScroll?: boolean;
  withAllPartsScroll?: boolean;
  withShade?: boolean;
  shadeStyle?: StyleProp<ViewStyle>;
  hiddenPartWrapperStyle?: StyleProp<ViewStyle>;
  maxHeight?: number;
  minHeight?: number | SharedValue<number>;
  withDraggable?: boolean;
};

export type BottomWindowWithGestureRef = {
  closeWindow: () => void;
  openWindow: () => void;
};
