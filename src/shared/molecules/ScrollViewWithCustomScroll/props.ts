import { type StyleProp, type ViewStyle } from 'react-native';

export type ScrollViewWithCustomScrollProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  withScroll?: boolean;
  withScrollToTop?: boolean;
  style?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
  withShadow?: boolean;
  offsetForShadow?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
};
