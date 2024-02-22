import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import CheckIcon from '../Icons/CheckIcon';
import Text from '../Text';
import { type CheckBoxProps } from './props';

const CheckBox = ({
  style,
  textStyle,
  buttonStyle,
  text,
  children,
  getCheckValue,
  error = { isError: false, message: '' },
}: CheckBoxProps): JSX.Element => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    checkButtonContainer: {
      borderColor: error.isError ? colors.errorColor : colors.borderColor,
    },
    checkBoxText: {
      color: error.isError ? colors.errorColor : colors.textSecondaryColor,
    },
    errorText: {
      color: colors.errorColor,
    },
    checkBoxContainer: {
      marginBottom: error.isError ? 12 : 0,
    },
  });

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getCheckValue(isChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return (
    <View style={style}>
      <View style={[styles.checkBoxContainer, computedStyles.checkBoxContainer]}>
        <Pressable
          onPress={() => setIsChecked(prev => !prev)}
          style={[styles.checkButtonContainer, computedStyles.checkButtonContainer, buttonStyle]}
        >
          {isChecked && <CheckIcon />}
        </Pressable>
        {text && (
          <Pressable onPress={() => setIsChecked(prev => !prev)}>
            <Text numberOfLines={1} style={[styles.checkBoxText, computedStyles.checkBoxText, textStyle]}>
              {text}
            </Text>
          </Pressable>
        )}
        {children}
      </View>
      {error.isError && <Text style={[styles.errorText, computedStyles.errorText]}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  checkButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 8,
  },
  checkBoxText: {
    fontSize: 12,
  },
  checkBoxLinkText: {
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: 12,
  },
});

export default CheckBox;
