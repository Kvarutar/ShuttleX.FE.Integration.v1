import { type ViewStyle } from 'react-native';

export enum TrafficLevel {
  Low = 'Low',
  Average = 'Average',
  High = 'High',
}

export type SegmentData = {
  percent: string;
  level: TrafficLevel;
};

export type TrafficIndicatorProps = {
  currentPercent: string;
  segments: SegmentData[];
  startDate?: Date;
  endDate?: Date;
  containerStyle?: ViewStyle;
};
