import { type StyleProp, type ViewStyle } from 'react-native';

export type StatsBlockProps = {
  textLikes: string;
  amountLikes: number;
  textRides?: string;
  amountRides?: number;
  style?: StyleProp<ViewStyle>;
};

export type StatsTextBlockProps = {
  amount: string;
  text: string;
};
