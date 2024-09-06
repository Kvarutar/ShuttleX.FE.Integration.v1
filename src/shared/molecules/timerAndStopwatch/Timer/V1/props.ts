import { type StyleProp, type ViewStyle } from 'react-native';

export type TimerV1SizesType = Record<
  TimerV1Modes,
  {
    iconSize: number;
    iconStrokeWidth: number;
    timerSize: number;
    fontSize: number;
  }
>;

export enum TimerV1Modes {
  Normal = 'normal',
  Mini = 'mini',
}

export type TimerV1Props = {
  initialDate?: Date;
  onAfterCountdownEnds?: () => void;
  style?: StyleProp<ViewStyle>;
  startColor: string;
  endColor: string;
  mode: TimerV1Modes;
  withCountdown?: boolean;
};
