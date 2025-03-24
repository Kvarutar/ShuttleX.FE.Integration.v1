import { type StyleProp, type ViewStyle } from 'react-native';
import { type TextInputProps as TextInputPropsNative } from 'react-native/Libraries/Components/TextInput/TextInput';

export enum DateTimePickerDisplay {
  Spinner = 'spinner',
  Calendar = 'calendar',
}

export enum DateTimePickerMode {
  Date = 'date',
  Time = 'time',
}

export type DateTimePickerProps = {
  onValueSelect: (date: Date) => void;
  display?: DateTimePickerDisplay;
  mode?: DateTimePickerMode;
  maximumDate?: Date;
  minimumDate?: Date;
  defaultValue?: Date | null;
  androidOptions?: {
    format: (date: Date) => string;
    placeholder: string;
    style?: TextInputPropsNative['style'];
    inputPickerStyle?: StyleProp<ViewStyle>;
    error?: { isError: boolean; message?: string };
  };
};
