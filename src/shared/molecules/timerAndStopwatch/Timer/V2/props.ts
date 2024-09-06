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
  }
>;
export type TimerColorsType = Record<
  TimerColorModes,
  {
    timerCustomBackgroundColor: string;
    timerElemColor: string;
    strokeColor?: string;
  }
>;

export enum TimerSizesModes {
  Normal = 'normal',
  Big = 'big',
}
export enum TimerColorModes {
  Main = 'main',
  Neutral = 'neutral',
  Warning = 'warning',
  Black = 'black',
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
  timerBackgroundColor?: string;
  text?: string;
  withCountdown?: boolean;
  isWithMarks?: boolean;
};
