import { forwardRef } from 'react';

import MoneyInput from './MoneyInput';
import { type TextInputBaseInputMode, TextInputInputMode, type TextInputProps, type TextInputRef } from './props';
import TextInputBase from './TextInputBase';

const TextInput = forwardRef<TextInputRef, TextInputProps>(
  (
    {
      style,
      placeholder,
      onChangeText,
      value,
      onEndEditing,
      onFocus,
      onBlur,
      inputMode,
      onKeyPress,
      maxLength,
      onlyDigits,
      editable,
      containerStyle,
      error = { isError: false },
      multiline,
    },
    ref,
  ) => {
    const props = {
      style,
      placeholder,
      onChangeText,
      value,
      onEndEditing,
      onFocus,
      onBlur,
      onKeyPress,
      maxLength,
      onlyDigits,
      editable,
      containerStyle,
      error,
      multiline,
      ref,
    };

    if (inputMode === TextInputInputMode.Money) {
      return <MoneyInput {...props} />;
    } else {
      return <TextInputBase {...props} inputMode={inputMode as TextInputBaseInputMode} />;
    }
  },
);

export default TextInput;
