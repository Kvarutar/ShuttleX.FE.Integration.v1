import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, TextInput as TextInputNative, View } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import Text from '../Text';
import { type TextInputBaseProps, type TextInputRef } from './props';

const TextInputBase = forwardRef<TextInputRef, TextInputBaseProps>(
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
        borderColor: error.isError ? colors.errorColor : colors.borderColor,
        color: colors.textPrimaryColor,
        marginBottom: error.isError && error.message ? 12 : 0,
      },
      focused: {
        borderColor: colors.primaryColor,
      },
      errorText: {
        color: colors.errorColor,
      },
    });

    return (
      <View style={containerStyle}>
        <TextInputNative
          style={[styles.input, computedStyles.input, isFocused ? computedStyles.focused : {}, style]}
          placeholderTextColor={colors.textSecondaryColor}
          cursorColor={colors.textPrimaryColor}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          multiline={multiline}
          inputMode={inputMode}
          onKeyPress={onKeyPress}
          onEndEditing={onEndEditing}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          maxLength={maxLength}
          editable={editable}
          pointerEvents="box-none"
          ref={innerRef}
        />
        {error.isError && error.message && (
          <Text style={[styles.errorText, computedStyles.errorText]}>{error.message}</Text>
        )}
      </View>
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
  errorText: {
    fontSize: 12,
  },
});

export default TextInputBase;
