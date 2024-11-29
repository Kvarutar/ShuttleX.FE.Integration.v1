import { type ScrollViewProps, type StyleProp, type ViewStyle } from 'react-native';

type ScrollViewExcludedProps =
  | 'scrollEnabled'
  | 'showsVerticalScrollIndicator'
  | 'scrollEventThrottle'
  | 'onContentSizeChange'
  | 'onLayout'
  | 'onScroll';

type CustomScrollViewProps = {
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

type ScrollViewRemainingProps = Omit<ScrollViewProps, keyof CustomScrollViewProps | ScrollViewExcludedProps>;

export type ScrollViewWithCustomScrollProps = CustomScrollViewProps & ScrollViewRemainingProps;
