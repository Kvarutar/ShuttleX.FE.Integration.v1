import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { OtpInput, type OtpInputRef } from 'react-native-otp-entry';

import { useTheme } from '../../../core/themes/v2/themeContext';
import { type CodeInputProps, type CodeInputRef } from './types';

const numberOfDigits = 4;

const CodeInput = forwardRef<CodeInputRef, CodeInputProps>(({ onCodeChange, isError }, ref): JSX.Element => {
  const { colors } = useTheme();
  const otpInput = useRef<OtpInputRef>(null);
  const [codeInput, setCodeInput] = useState('');

  useImperativeHandle(ref, () => ({
    cleanFields: () => otpInput.current?.clear(),
  }));

  useEffect(() => {
    onCodeChange(codeInput);
  }, [codeInput, onCodeChange]);

  const getBorderColor = (): string => {
    if (isError) {
      return colors.errorColor;
    }
    if (codeInput.length === numberOfDigits) {
      return colors.successColor;
    }
    return colors.borderColor;
  };

  const computedStyles = StyleSheet.create({
    pinCodeContainerStyle: {
      borderColor: colors.borderColor,
      backgroundColor: colors.backgroundPrimaryColor,
    },
    pinCodeTextStyle: {
      color: colors.textPrimaryColor,
    },
    focusStickStyle: {
      paddingVertical: 8,
      backgroundColor: colors.textPrimaryColor,
    },
    filledPinCodeContainerStyle: {
      backgroundColor: colors.backgroundSecondaryColor,
      borderColor: getBorderColor(),
    },
    innerTetInputStyle: {
      marginLeft: 24,
    },
  });

  return (
    <OtpInput
      ref={otpInput}
      numberOfDigits={numberOfDigits}
      focusColor={colors.successColor}
      disabled={false}
      type="numeric"
      secureTextEntry={false}
      focusStickBlinkingDuration={1000}
      onTextChange={setCodeInput}
      textInputProps={{
        accessibilityLabel: 'One-Time Password',
        style: computedStyles.innerTetInputStyle,
      }}
      theme={{
        containerStyle: styles.container,
        pinCodeContainerStyle: { ...styles.pinCodeContainerStyle, ...computedStyles.pinCodeContainerStyle },
        pinCodeTextStyle: { ...styles.pinCodeTextStyle, ...computedStyles.pinCodeTextStyle },
        focusStickStyle: computedStyles.focusStickStyle,
        filledPinCodeContainerStyle: computedStyles.filledPinCodeContainerStyle,
      }}
      autoFocus
      blurOnFilled
    />
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  pinCodeContainerStyle: {
    height: 72,
    width: 64,
  },
  pinCodeTextStyle: {
    fontFamily: 'Inter Bold',
    fontSize: 40,
  },
});

export default CodeInput;
