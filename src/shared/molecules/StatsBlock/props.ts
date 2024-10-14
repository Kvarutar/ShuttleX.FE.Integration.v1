import { type StyleProp, type ViewStyle } from 'react-native';

export type StatsBlockProps = {
  amountLikes: number;
  amountRides?: number;
  style?: StyleProp<ViewStyle>;
};

export type StatsTextBlockProps = {
  amount: string;
  text: string;
};
