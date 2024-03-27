import { type StyleProp, type TextStyle } from 'react-native';

export enum TextElipsizeMode {
  Head = 'head',
  Middle = 'middle',
  Tail = 'tail',
  Clip = 'clip',
}

export type TextProps = {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numberOfLines?: number;
  elipsizeMode?: TextElipsizeMode;
};
