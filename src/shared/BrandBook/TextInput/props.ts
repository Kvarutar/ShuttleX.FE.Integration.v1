import { type TextInputProps as TextInputPropsNative } from 'react-native';

export enum TextInputInputMode {
  None = 'none',
  Text = 'text',
  Decimal = 'decimal',
  Numeric = 'numeric',
  Tel = 'tel',
  Search = 'search',
  Email = 'email',
  Url = 'url',
}

export type TextInputProps = {
  style?: TextInputPropsNative['style'];
  placeholder?: TextInputPropsNative['placeholder'];
  onChangeText?: TextInputPropsNative['onChangeText'];
  value?: TextInputPropsNative['value'];
  maxLength?: TextInputPropsNative['maxLength'];
  inputMode?: TextInputInputMode;
  onEndEditing?: TextInputPropsNative['onEndEditing'];
  editable?: TextInputPropsNative['editable'];
  onFocus?: () => void;
  onBlur?: () => void;
};
