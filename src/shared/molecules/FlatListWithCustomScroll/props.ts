import { type ListRenderItem, type StyleProp, type ViewStyle } from 'react-native';

export type FlatListWithCustomScrollProps = {
  renderItem: ListRenderItem<any>;
  items: Array<any>;
  style?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  withScroll?: boolean;
  visibleBarOffset?: number;
};
