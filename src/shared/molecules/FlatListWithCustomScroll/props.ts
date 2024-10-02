import { type FlatListProps, type ListRenderItem, type StyleProp, type ViewStyle } from 'react-native';

export type FlatListWithCustomScrollProps<ItemT> = {
  renderItem: ListRenderItem<ItemT>;
  items: Array<ItemT>;
  style?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  withScroll?: boolean;
  withShadow?: boolean;
  offsetForShadow?: number;
  wrapperStyle?: StyleProp<ViewStyle>;
  visibleBarOffset?: number;
  getItemLayout?: FlatListProps<ItemT>['getItemLayout'];
  windowSize?: FlatListProps<ItemT>['windowSize'];
  initialNumToRender?: FlatListProps<ItemT>['initialNumToRender'];
  keyExtractor?: FlatListProps<ItemT>['keyExtractor'];
};
