import { type ListRenderItem, type StyleProp, type ViewStyle } from 'react-native';

export type FlatListWithCustomScrollProps = {
  renderItems: ListRenderItem<string>;
  items: Array<any>;
  itemHeight: number;
  style?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
  withScroll?: boolean;
};
