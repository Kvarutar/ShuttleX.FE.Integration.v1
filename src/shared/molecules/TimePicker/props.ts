import { type TextInputProps as TextInputPropsNative } from 'react-native';

export type TimePickerPropsV1 = {
  style?: TextInputPropsNative['style'];
  placeholder: string;
  onTimeSelect: (time: Date) => void;
  formatTime: (time: Date) => string;
  minimumTime?: Date;
};

export type TimePickerProps = {
  onTimeSelect: (time: Date) => void;
  minimumTime?: Date;
};
