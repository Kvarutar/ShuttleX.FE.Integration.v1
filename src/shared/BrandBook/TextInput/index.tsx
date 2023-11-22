import React, { useState } from 'react';
import { StyleSheet, TextInput as TextInputNative } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import { type TextInputProps } from './props';

const TextInput = ({
  style,
  placeholder,
  onChangeText,
  value,
  onEndEditing,
  onFocus,
  onBlur,
  inputMode,
  maxLength,
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const { colors } = useTheme();

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
      onEndEditing={onEndEditing}
      onFocus={onInputFocus}
      onBlur={onInputBlur}
      maxLength={maxLength}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    padding: 0,
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
