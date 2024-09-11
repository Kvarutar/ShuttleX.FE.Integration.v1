import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export type TimerSizesType = Record<
  TimerSizesModes,
  {
    iconStrokeWidth: number;
    timerSize: number;
    numFontSize: number;
    marksHeight: number;
    textFontSize: number;
    marksWidth: number;
    opacity: number;
    padding: number;
    lineHeight: number;
  }
>;

export enum TimerSizesModes {
  S = 's',
  L = 'l',
}

export enum TimerColorModes {
  Mode1 = 'mode1',
  Mode2 = 'mode2',
  Mode3 = 'mode3',
  Mode4 = 'mode4',
  Mode5 = 'mode5',
}

export type TimerProps = {
  time: number;
  onAfterCountdownEnds?: () => void;
  isWaiting?: boolean;
  style?: {
    timerWrapper?: StyleProp<ViewStyle>;
    timerNumText?: StyleProp<TextStyle>;
    timerSecondaryText?: StyleProp<TextStyle>;
    timerMainText?: StyleProp<TextStyle>;
  };
  sizeMode: TimerSizesModes;
  colorMode: TimerColorModes;
  text?: string;
  withCountdown?: boolean;
};
