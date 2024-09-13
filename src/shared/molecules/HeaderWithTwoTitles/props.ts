import { type StyleProp, type TextStyle } from 'react-native';

export type HeaderWithTwoTitlesProps = {
  textStyle?: StyleProp<TextStyle>;
  firstTitle: string;
  secondTitle: string;
};
