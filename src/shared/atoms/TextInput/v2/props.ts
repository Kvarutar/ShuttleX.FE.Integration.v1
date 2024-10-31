import { type StyleProp, TextInput, type TextInputProps as TextInputPropsNative, type ViewStyle } from 'react-native';

export enum TextInputInputMode {
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

export type TextInputBaseInputMode = Exclude<TextInputInputMode, TextInputInputMode.Money>;

export type TextInputBaseProps = {
  inputStyle?: TextInputPropsNative['style'];
  placeholder?: TextInputPropsNative['placeholder'];
  onChangeText?: TextInputPropsNative['onChangeText'];
  value?: TextInputPropsNative['value'];
  currencySymbol?: string;
  maxSymbolsAfterComma?: number;
  maxLength?: TextInputPropsNative['maxLength'];
  onlyDigits?: boolean;
  inputMode?: TextInputBaseInputMode;
  onKeyPress?: TextInputPropsNative['onKeyPress'];
  onEndEditing?: TextInputPropsNative['onEndEditing'];
  editable?: TextInputPropsNative['editable'];
  onFocus?: () => void;
  onBlur?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  error?: { isError: boolean; message?: string };
  multiline?: TextInputPropsNative['multiline'];
  withClearButton?: boolean;
};

export type TextInputRef = Pick<TextInput, 'focus' | 'clear' | 'blur' | 'isFocused' | 'setNativeProps'>;

export type TextInputProps = Omit<TextInputBaseProps, 'inputMode'> & {
  inputMode?: TextInputInputMode;
};
