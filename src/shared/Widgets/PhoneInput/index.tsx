import React, { useEffect, useState } from 'react';
import { Keyboard, type LayoutRectangle, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { countryDtos } from '../../../core/countries/countryDtos';
import { indexOfNotFound, timeDropdownVisible } from '../../../core/monkey-patch/array.helper';
import { defaultShadow } from '../../../core/themes/shadows';
import { useTheme } from '../../../core/themes/themeContext';
import { countryFlags } from '../../BrandBook/Icons/Flags';
import ShortArrowIcon from '../../BrandBook/Icons/ShortArrowIcon';
import TextInput from '../../BrandBook/TextInput';
import { TextInputInputMode, type TextInputProps } from '../../BrandBook/TextInput/props';
import ListItem from './ListItem';

const PhoneInput = (): JSX.Element => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [inputContainerLayout, setInputContainerLayout] = useState<LayoutRectangle | null>(null);
  const [flagState, setFlagState] = useState(countryDtos[0]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [onlyNumbersInputValue, setOnlyNumbersInputValue] = useState('');
  const [isInputDone, setIsInputDone] = useState(false);

  const { colors } = useTheme();

  useEffect(() => {
    if (flagState) {
      setIsInputDone(false);
      setInputValue(formatNumbersToMask('', flagState.phoneMask));
      setOnlyNumbersInputValue('');
    }
  }, [flagState]);

  useEffect(() => {
    if (flagState) {
      setInputValue(formatNumbersToMask(onlyNumbersInputValue, flagState.phoneMask));
    }
  }, [onlyNumbersInputValue, flagState]);

  const onInputChangeText: TextInputProps['onChangeText'] = text => {
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
      setTimeout(() => setIsDropdownVisible(true), timeDropdownVisible);
    } else {
      setIsDropdownVisible(true);
    }
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

  const computedStyles = StyleSheet.create({
    flagContainer: {
      backgroundColor: colors.backgroundPrimaryColor,
      borderTopWidth: isInputDone && !isInputFocused ? 0 : 1,
      borderBottomWidth: isInputDone && !isInputFocused ? 0 : 1,
      borderLeftWidth: isInputDone && !isInputFocused ? 0 : 1,
      borderTopColor: colors.borderColor,
      borderBottomColor: colors.borderColor,
      borderLeftColor: colors.borderColor,
      borderRightColor: colors.borderColor,
    },
    flagContainerFocused: {
      borderLeftColor: colors.primaryColor,
      borderTopColor: colors.primaryColor,
      borderBottomColor: colors.primaryColor,
    },
    input: {
      borderWidth: isInputDone && !isInputFocused ? 0 : 1,
    },
    dropdownContainer: {
      borderColor: colors.primaryColor,
      backgroundColor: colors.backgroundPrimaryColor,
    },
    line: {
      backgroundColor: colors.borderColor,
    },
  });

  return (
    <>
      <View style={styles.flagAndInputContainer} onLayout={event => setInputContainerLayout(event.nativeEvent.layout)}>
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
        <TextInput
          style={[styles.input, computedStyles.input]}
          inputMode={TextInputInputMode.Numeric}
          value={inputValue}
          onChangeText={onInputChangeText}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </View>

      {isDropdownVisible && inputContainerLayout && (
        <Pressable style={styles.dropdownWrapper} onPress={() => setIsDropdownVisible(false)}>
          <View
            style={[
              styles.dropdownContainer,
              computedStyles.dropdownContainer,
              {
                top: inputContainerLayout.y,
                left: inputContainerLayout.x,
                width: inputContainerLayout.width,
              },
            ]}
          >
            <ScrollView nestedScrollEnabled>
              {countryDtos.map((item, index) => {
                return (
                  <ListItem
                    iconSvg={countryFlags[item.countryCode]}
                    icc={item.icc}
                    countryName={item.countryName}
                    onFlagContainerPress={() => {
                      setFlagState(item);
                      setIsDropdownVisible(false);
                    }}
                    key={item.countryCode}
                    {...(index === 0 ? { withArrow: true } : {})}
                  />
                );
              })}
            </ScrollView>
            <View style={[styles.line, computedStyles.line]} />
          </View>
        </Pressable>
      )}
    </>
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
    flex: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    paddingLeft: 20,
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
});

export default PhoneInput;
