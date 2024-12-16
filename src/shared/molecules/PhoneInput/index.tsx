import { useEffect, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/v2/themeContext';
import { formatNumbersToMask } from '../../../utils';
import Text from '../../atoms/Text';
import { type TextInputV1Props } from '../../atoms/TextInput/v1/props';
import TextInput from '../../atoms/TextInput/v2';
import { TextInputInputMode } from '../../atoms/TextInput/v2/props';
import { countryFlags } from '../../icons/Flags';
import ShortArrowIcon from '../../icons/ShortArrowIcon';
import { type PhoneInputProps } from './props';

const PhoneInput = ({
  style,
  getPhoneNumber,
  onFlagPress,
  flagState,
  error = { isError: false, message: '' },
}: PhoneInputProps): JSX.Element => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [onlyNumbersInputValue, setOnlyNumbersInputValue] = useState('');
  const [isInputDone, setIsInputDone] = useState(false);

  const { colors } = useTheme();

  const fullPhoneMask = flagState.icc + '' + flagState.phoneMask;

  useEffect(() => {
    if (flagState) {
      setIsInputDone(false);
      setInputValue(formatNumbersToMask('', fullPhoneMask));
      setOnlyNumbersInputValue('');
    }
  }, [flagState, fullPhoneMask]);

  useEffect(() => {
    if (onlyNumbersInputValue !== '') {
      getPhoneNumber(inputValue);
    } else {
      getPhoneNumber('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, isInputDone]);

  useEffect(() => {
    if (flagState) {
      setInputValue(formatNumbersToMask(onlyNumbersInputValue, fullPhoneMask));
    }
  }, [onlyNumbersInputValue, flagState, fullPhoneMask]);

  const onInputChangeText: TextInputV1Props['onChangeText'] = text => {
    // Checks is phone is fully entered
    if (flagState && text.length >= fullPhoneMask.length) {
      setIsInputDone(true);
      Keyboard.dismiss();
    } else {
      setIsInputDone(false);
    }
    // Controls delete text in input
    if (text.length < inputValue.length) {
      setOnlyNumbersInputValue(prev => prev.slice(0, -1));
      return;
    }
    // Controls add text in input
    if (flagState && text.length <= fullPhoneMask.length) {
      const lastChar = text[text.length - 1];
      if (lastChar && /\d/.test(lastChar)) {
        setOnlyNumbersInputValue(prev => prev + lastChar);
      }
    }
  };

  const onInputFlagPress = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    onFlagPress();
  };

  const borderColor = error.isError ? colors.errorColor : colors.borderColor;

  const computedStyles = StyleSheet.create({
    flagContainer: {
      backgroundColor: colors.backgroundPrimaryColor,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderTopColor: borderColor,
      borderBottomColor: borderColor,
      borderLeftColor: borderColor,
      borderRightColor: colors.borderColor,
    },
    flagContainerFocused: {
      borderLeftColor: colors.primaryColor,
      borderTopColor: colors.primaryColor,
      borderBottomColor: colors.primaryColor,
    },
    dropdownContainer: {
      borderColor: colors.primaryColor,
      backgroundColor: colors.backgroundPrimaryColor,
    },
    line: {
      backgroundColor: colors.borderColor,
    },
    errorText: {
      color: colors.errorColor,
    },
    flagAndInputContainer: {
      marginBottom: error.isError && error.message ? 12 : 0,
    },
    shortArrowIcon: {
      color: colors.strokeColor,
    },
    inputText: {
      color: onlyNumbersInputValue ? colors.textPrimaryColor : colors.textSecondaryColor,
      fontFamily: onlyNumbersInputValue ? 'Inter Medium' : 'Inter Regular',
    },
  });

  return (
    <View>
      <View style={[styles.flagAndInputContainer, computedStyles.flagAndInputContainer, style]}>
        <Pressable
          style={[
            styles.flagContainer,
            computedStyles.flagContainer,
            isInputFocused ? computedStyles.flagContainerFocused : {},
          ]}
          onPress={() => onInputFlagPress()}
        >
          {flagState && countryFlags[flagState.countryCode]}
          <ShortArrowIcon color={computedStyles.shortArrowIcon.color} style={styles.shortArrowIcon} />
        </Pressable>
        <TextInput
          inputStyle={computedStyles.inputText}
          error={{ isError: error.isError }}
          containerStyle={styles.input}
          inputMode={TextInputInputMode.Numeric}
          value={inputValue}
          wrapperStyle={styles.inputWrapperStyle}
          onChangeText={onInputChangeText}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </View>
      {error.isError && error.message && (
        <Text style={[styles.errorText, computedStyles.errorText]}>{error.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flagAndInputContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  flagContainer: {
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingLeft: 20,
    paddingRight: 16,
    gap: 8,
    borderRightWidth: 1,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  input: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    paddingLeft: 20,
  },
  inputWrapperStyle: {
    flex: 1,
  },
  dropdownWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    elevation: 1,
  },
  dropdownContainer: {
    position: 'absolute',
    maxHeight: 218,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 9,
  },
  line: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 88,
    width: 1,
  },
  shortArrowIcon: {
    transform: [{ rotate: '270deg' }],
  },
  errorText: {
    fontSize: 12,
  },
});

export default PhoneInput;
