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
  startTime: number;
  endTime: number;
};
