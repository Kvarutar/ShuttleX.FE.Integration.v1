import { type StyleProp, type TextStyle } from 'react-native';

export type CountingComponentProps = {
  initialDate: Date;
  onAfterCountdownEnds?: () => void;
  mask: string;
  style?: StyleProp<TextStyle>;
};
