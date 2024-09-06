import { forwardRef } from 'react';

import MoneyInput from './MoneyInput';
import {
  type TextInputBaseV1InputMode,
  TextInputV1InputMode,
  type TextInputV1Props,
  type TextInputV1Ref,
} from './props';
import TextInputBase from './TextInputBase';

const TextInputV1 = forwardRef<TextInputV1Ref, TextInputV1Props>(
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
      editable,
      containerStyle,
      error,
      multiline,
      ref,
    };

    if (inputMode === TextInputV1InputMode.Money) {
      return <MoneyInput {...props} />;
    } else {
      return <TextInputBase {...props} inputMode={inputMode as TextInputBaseV1InputMode} />;
    }
  },
);

export default TextInputV1;
