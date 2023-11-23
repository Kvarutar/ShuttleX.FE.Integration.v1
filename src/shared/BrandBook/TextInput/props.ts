import { type TextInputProps as TextInputPropsNative } from 'react-native';

export type TextInputProps = {
  style?: TextInputPropsNative['style'];
  placeholder?: TextInputPropsNative['placeholder'];
  onChangeText?: TextInputPropsNative['onChangeText'];
  value?: TextInputPropsNative['value'];
  maxLength?: TextInputPropsNative['maxLength'];
  inputMode?: TextInputPropsNative['inputMode'];
  onEndEditing?: TextInputPropsNative['onEndEditing'];
  editable?: TextInputPropsNative['editable'];
  onFocus?: () => void;
  onBlur?: () => void;
};
