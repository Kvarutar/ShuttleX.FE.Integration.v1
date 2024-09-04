import { useEffect, useState } from 'react';
import { Keyboard, type LayoutRectangle, Pressable, StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { indexOfNotFound } from '../../../core/monkey-patch/array.helper';
import { defaultShadow } from '../../../core/themes/shadows';
import { useThemeV1 } from '../../../core/themes/v1/themeContext';
import Text from '../../atoms/Text';
import TextInputV1 from '../../atoms/TextInput/v1';
import { TextInputV1InputMode, type TextInputV1Props } from '../../atoms/TextInput/v1/props';
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
  const [inputContainerLayout, setInputContainerLayout] = useState<LayoutRectangle | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [onlyNumbersInputValue, setOnlyNumbersInputValue] = useState('');
  const [isInputDone, setIsInputDone] = useState(false);

  const { colors, themeMode } = useThemeV1();

  useEffect(() => {
    if (flagState) {
      setIsInputDone(false);
      setInputValue(formatNumbersToMask('', flagState.phoneMask));
      setOnlyNumbersInputValue('');
    }
  }, [flagState]);

  useEffect(() => {
    if (onlyNumbersInputValue !== '') {
      getPhoneNumber(inputValue);
    } else {
      getPhoneNumber(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, isInputDone]);

  useEffect(() => {
    if (flagState) {
      setInputValue(formatNumbersToMask(onlyNumbersInputValue, flagState.phoneMask));
    }
  }, [onlyNumbersInputValue, flagState]);

  const onInputChangeText: TextInputV1Props['onChangeText'] = text => {
    // Checks is phone is fully entered
    if (flagState && text.length >= flagState.phoneMask.length) {
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
    if (flagState && text.length <= flagState.phoneMask.length) {
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

  const formatNumbersToMask = (numbers: string, mask: string): string => {
    const numbersArr = numbers.split('');
    const maskArr = mask.split('');

    for (const number of numbersArr) {
      const hashPosition = maskArr.indexOf('#');
      if (hashPosition === indexOfNotFound) {
        break;
      }
      maskArr[hashPosition] = number;
    }

    const hashPosition = maskArr.indexOf('#');
    // Check if there is hash sign left
    if (hashPosition === -1) {
      return maskArr.join('');
    }
    return maskArr.slice(0, hashPosition).join('');
  };

  const borderColor = error.isError ? colors.errorColor : colors.borderColor;
  const borderWidth = isInputDone && !isInputFocused && themeMode === 'light' ? 0 : 1;

  const computedStyles = StyleSheet.create({
    flagContainer: {
      backgroundColor: colors.backgroundPrimaryColor,
      borderTopWidth: borderWidth,
      borderBottomWidth: borderWidth,
      borderLeftWidth: borderWidth,
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
    input: {
      borderWidth: borderWidth,
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
      marginBottom: error.isError ? 12 : 0,
    },
  });

  return (
    <View>
      <View
        style={[styles.flagAndInputContainer, computedStyles.flagAndInputContainer, style]}
        onLayout={event => setInputContainerLayout(event.nativeEvent.layout)}
      >
        {isInputDone && !isInputFocused && inputContainerLayout && (
          <Shadow
            {...defaultShadow(colors.weakShadowColor)}
            style={[styles.shadow, { width: inputContainerLayout.width, height: inputContainerLayout.height }]}
            stretch
          />
        )}

        <Pressable
          style={[
            styles.flagContainer,
            computedStyles.flagContainer,
            isInputFocused ? computedStyles.flagContainerFocused : {},
          ]}
          onPress={() => onInputFlagPress()}
        >
          {flagState && countryFlags[flagState.countryCode]}
          <ShortArrowIcon style={styles.shortArrowIcon} />
        </Pressable>
        <TextInputV1
          error={{ isError: error.isError }}
          style={[styles.input, computedStyles.input]}
          inputMode={TextInputV1InputMode.Numeric}
          value={inputValue}
          containerStyle={styles.inputContainerStyle}
          onChangeText={onInputChangeText}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </View>
      {error.isError && <Text style={[styles.errorText, computedStyles.errorText]}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
  },
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
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  input: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    paddingLeft: 20,
  },
  inputContainerStyle: {
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
  containerInputStyle: {
    flex: 1,
  },
});

export default PhoneInput;
