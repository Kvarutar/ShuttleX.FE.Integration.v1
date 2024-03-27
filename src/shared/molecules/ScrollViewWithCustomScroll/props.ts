import { type StyleProp, type ViewStyle } from 'react-native';

export type ScrollViewWithCustomScrollProps = {
  children: React.ReactNode;
  withScroll?: boolean;
  style?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
  visibleBarOffset?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
};
