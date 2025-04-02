import { type StyleProp, type TextStyle } from 'react-native';

export type CountingComponentProps = {
  time: number;
  text?: string;
  onAfterCountdownEnds?: () => void;
  isWaiting?: boolean;
  style?: {
    timerNumText?: StyleProp<TextStyle>;
    timerSecondaryText?: StyleProp<TextStyle>;
    timerMainText?: StyleProp<TextStyle>;
  };
  countingForwardStartTime?: number;
};
