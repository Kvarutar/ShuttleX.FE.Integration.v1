import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, TextInput as TextInputNative } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import { type TextInputProps, type TextInputRef } from './props';

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
      editable,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const { colors } = useTheme();

    const innerRef = useRef<TextInputNative>(null);

    useImperativeHandle(ref, () => ({
      focus: () => innerRef.current?.focus(),
      blur: () => innerRef.current?.blur(),
      clear: () => innerRef.current?.clear(),
      isFocused: () => Boolean(innerRef.current?.isFocused),
      setNativeProps: () => innerRef.current?.setNativeProps,
    }));

    const onInputFocus = () => {
      if (onFocus) {
        onFocus();
      }
      setIsFocused(true);
    };

    const onInputBlur = () => {
      if (onBlur) {
        onBlur();
      }
      setIsFocused(false);
    };

    const computedStyles = StyleSheet.create({
      input: {
        backgroundColor: colors.backgroundPrimaryColor,
        borderColor: colors.borderColor,
        color: colors.textPrimaryColor,
      },
      focused: {
        borderColor: colors.primaryColor,
      },
    });

    return (
      <TextInputNative
        style={[styles.input, computedStyles.input, isFocused ? computedStyles.focused : {}, style]}
        placeholderTextColor={colors.textSecondaryColor}
        cursorColor={colors.textPrimaryColor}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        inputMode={inputMode}
        onKeyPress={onKeyPress}
        onEndEditing={onEndEditing}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        maxLength={maxLength}
        editable={editable}
        ref={innerRef}
      />
    );
  },
);

const styles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 30,
    height: 60,
    fontSize: 16,
    fontFamily: 'Inter Regular',
    letterSpacing: 0.64,
  },
});

export default TextInput;
