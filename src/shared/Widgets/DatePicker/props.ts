import { type TextInputProps as TextInputPropsNative } from 'react-native';

export enum DatePickerDisplay {
  Spinner = 'spinner',
  Calendar = 'calendar',
}

export type DatePickerProps = {
  style?: TextInputPropsNative['style'];
  display?: DatePickerDisplay;
  getDate: (date: Date) => void;
};
