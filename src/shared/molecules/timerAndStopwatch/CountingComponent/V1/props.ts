import { type StyleProp, type TextStyle } from 'react-native';

export type CountingV1ComponentProps = {
  initialDate: Date;
  onAfterCountdownEnds?: () => void;
  mask: string;
  style?: StyleProp<TextStyle>;
};
