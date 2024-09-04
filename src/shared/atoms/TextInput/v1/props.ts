import { type StyleProp, TextInput, type TextInputProps as TextInputPropsNative, type ViewStyle } from 'react-native';

export enum TextInputV1InputMode {
  None = 'none',
  Text = 'text',
  Decimal = 'decimal',
  Numeric = 'numeric',
  Tel = 'tel',
  Search = 'search',
  Email = 'email',
  Url = 'url',
  Money = 'money',
}

export type TextInputBaseV1InputMode = Exclude<TextInputV1InputMode, TextInputV1InputMode.Money>;

export type TextInputBaseV1Props = {
  style?: TextInputPropsNative['style'];
  placeholder?: TextInputPropsNative['placeholder'];
  onChangeText?: TextInputPropsNative['onChangeText'];
  value?: TextInputPropsNative['value'];
  maxLength?: TextInputPropsNative['maxLength'];
  inputMode?: TextInputBaseV1InputMode;
  onKeyPress?: TextInputPropsNative['onKeyPress'];
  onEndEditing?: TextInputPropsNative['onEndEditing'];
  editable?: TextInputPropsNative['editable'];
  onFocus?: () => void;
  onBlur?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  error?: { isError: boolean; message?: string };
  multiline?: TextInputPropsNative['multiline'];
};

export type TextInputV1Ref = Pick<TextInput, 'focus' | 'clear' | 'blur' | 'isFocused' | 'setNativeProps'>;

export type TextInputV1Props = Omit<TextInputBaseV1Props, 'inputMode'> & {
  inputMode?: TextInputV1InputMode;
};
