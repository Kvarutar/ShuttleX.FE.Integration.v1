import { TextInput, type TextInputProps as TextInputPropsNative } from 'react-native';

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
  onKeyPress?: TextInputPropsNative['onKeyPress'];
  onEndEditing?: TextInputPropsNative['onEndEditing'];
  editable?: TextInputPropsNative['editable'];
  onFocus?: () => void;
  onBlur?: () => void;
  error?: { isError: boolean; message?: string };
};

export type TextInputRef = Pick<TextInput, 'focus' | 'clear' | 'blur' | 'isFocused' | 'setNativeProps'>;
