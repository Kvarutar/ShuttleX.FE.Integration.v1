import { type StyleProp, type TextStyle } from 'react-native';

export type HeaderWithTwoTitlesProps = {
  firstTextStyle?: StyleProp<TextStyle>;
  secondTextStyle?: StyleProp<TextStyle>;
  firstTitle: string;
  secondTitle: string;
  inOneLine?: boolean;
};
