import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type GestureStateChangeEvent, type PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { type SharedValue } from 'react-native-reanimated';

export type BottomWindowWithGestureProps = {
  visiblePart?: ReactNode;
  hiddenPart?: ReactNode;
  headerElement?: ReactNode;
  additionalTopContent?: ReactNode;
  alerts?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  visiblePartStyle?: StyleProp<ViewStyle>;
  visiblePartContainerStyle?: StyleProp<ViewStyle>;
  visiblePartWrapperStyle?: StyleProp<ViewStyle>;
  hiddenPartStyle?: StyleProp<ViewStyle>;
  hiddenPartContainerStyle?: StyleProp<ViewStyle>;
  hiddenPartWrapperStyle?: StyleProp<ViewStyle>;
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
  maxHeight?: number;
  minHeight?: number | SharedValue<number>;
  withDraggable?: boolean;
  onGestureStart?: (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void;
  onAnimationEnd?: (values: { isOpened: boolean; pageY: number }) => void;
  onHiddenOrVisibleHeightChange?: (values: { isOpened: boolean; isWindowAnimating: boolean; pageY: number }) => void;
};

export type BottomWindowWithGestureRef = {
  closeWindow: () => void;
  openWindow: () => void;
};
