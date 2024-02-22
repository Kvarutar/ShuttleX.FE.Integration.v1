import { type StyleProp, type TextInputProps as TextInputPropsNative, type ViewStyle } from 'react-native';

export enum DatePickerDisplay {
  Spinner = 'spinner',
  Calendar = 'calendar',
}

export type DatePickerProps = {
  style?: TextInputPropsNative['style'];
  inputDatePickerStyle?: StyleProp<ViewStyle>;
  display?: DatePickerDisplay;
  getDate: (date: Date) => void;
  error?: { isError: boolean; message: string };
};
