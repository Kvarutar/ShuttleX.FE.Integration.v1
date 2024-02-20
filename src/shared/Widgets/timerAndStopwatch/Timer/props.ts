import { type StyleProp, type ViewStyle } from 'react-native';

export type TimerSizesType = Record<
  TimerModes,
  {
    iconSize: number;
    iconStrokeWidth: number;
    timerSize: number;
    fontSize: number;
  }
>;

export enum TimerModes {
  Normal = 'normal',
  Mini = 'mini',
}

export type TimerProps = {
  initialDate?: Date;
  onAfterCountdownEnds?: () => void;
  style?: StyleProp<ViewStyle>;
  startColor: string;
  endColor: string;
  mode: TimerModes;
  withCountdown?: boolean;
};
