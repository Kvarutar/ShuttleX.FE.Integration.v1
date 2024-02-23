import { type TextInputProps as TextInputPropsNative } from 'react-native';

export type DatePickerProps = {
  style?: TextInputPropsNative['style'];
  placeholder: string;
  onTimeSelect: (time: Date) => void;
  formatTime: (time: Date) => string;
};
