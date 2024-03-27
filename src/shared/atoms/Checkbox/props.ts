import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export type CheckBoxProps = {
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  text?: string;
  children?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  getCheckValue: (text: boolean) => void;
  error?: { isError: boolean; message: string };
};
