import { forwardRef } from 'react';

import MoneyInput from './MoneyInput';
import { type TextInputBaseInputMode, TextInputInputMode, type TextInputProps, type TextInputRef } from './props';
import TextInputBase from './TextInputBase';

const TextInput = forwardRef<TextInputRef, TextInputProps>(
  (
    {
      inputStyle,
      containerStyle,
      wrapperStyle,
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
      error = { isError: false },
      multiline,
      withClearButton = false,
    },
    ref,
  ) => {
    const props = {
      inputStyle,
      containerStyle,
      wrapperStyle,
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
      error,
      multiline,
      ref,
      withClearButton,
    };

    if (inputMode === TextInputInputMode.Money) {
      return <MoneyInput {...props} />;
    } else {
      return <TextInputBase {...props} inputMode={inputMode as TextInputBaseInputMode} />;
    }
  },
);

export default TextInput;
