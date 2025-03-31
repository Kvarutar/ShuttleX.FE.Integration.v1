import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput as TextInputNative, View } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import InputXIcon from '../../icons/InputXIcon';
import Text from '../Text';
import { type TextInputBaseProps, type TextInputRef } from './types';

const TextInputBase = forwardRef<TextInputRef, TextInputBaseProps>(
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
      withClearButton,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isInputFilled, setIsInputFilled] = useState(false);
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

    const onChangeTextHandler = (text: string) => {
      onChangeText?.(text);
      setIsInputFilled(Boolean(text.length));
    };

    const computedStyles = StyleSheet.create({
      inputContainer: {
        backgroundColor: colors.backgroundPrimaryColor,
        borderColor: error.isError ? colors.errorColor : colors.borderColor,
        color: colors.textPrimaryColor,
        marginBottom: error.isError && error.message ? 12 : 0,
      },
      input: {
        color: colors.textPrimaryColor,
        fontFamily: isInputFilled ? 'Inter Medium' : 'Inter Regular',
      },
      focused: {
        borderColor: colors.primaryColor,
      },
      errorText: {
        color: colors.errorColor,
      },
    });

    return (
      <View style={wrapperStyle}>
        <View
          style={[
            styles.inputContainer,
            computedStyles.inputContainer,
            isFocused ? computedStyles.focused : {},
            containerStyle,
          ]}
        >
          <TextInputNative
            style={[styles.input, computedStyles.input, inputStyle]}
            placeholderTextColor={colors.textSecondaryColor}
            cursorColor={colors.textPrimaryColor}
            placeholder={placeholder}
            onChangeText={onChangeTextHandler}
            value={value}
            multiline={multiline}
            inputMode={inputMode}
            keyboardType={onlyDigits ? 'numeric' : undefined}
            onKeyPress={onKeyPress}
            onEndEditing={onEndEditing}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            maxLength={maxLength}
            editable={editable}
            pointerEvents="box-none"
            ref={innerRef}
          />
          {withClearButton && value && onChangeText !== undefined && (
            <Pressable onPress={() => onChangeText('')}>
              <InputXIcon />
            </Pressable>
          )}
        </View>

        {error.isError && error.message && (
          <Text style={[styles.errorText, computedStyles.errorText]}>{error.message}</Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 12,
    height: 60,
    fontSize: 16,
    letterSpacing: 0.64,
  },
  errorText: {
    fontSize: 12,
  },
});

export default TextInputBase;
