import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import CheckIcon from '../../icons/CheckIcon';
import Text from '../Text';
import { type CheckBoxProps } from './props';

const CheckBox = ({
  style,
  textStyle,
  buttonStyle,
  text,
  children,
  onChange,
  error = { isError: false, message: '' },
}: CheckBoxProps): JSX.Element => {
  const { colors } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(prev => {
      const newValue = !prev;
      onChange(newValue);
      return newValue;
    });
  };

  const computedStyles = StyleSheet.create({
    checkButtonContainer: {
      borderColor: error.isError ? colors.errorColor : colors.borderColor,
      backgroundColor: isChecked ? colors.primaryColor : 'transparent',
    },
    checkBoxText: {
      color: error.isError && error.message ? colors.errorColor : colors.textSecondaryColor,
    },
    errorText: {
      color: colors.errorColor,
    },
    checkBoxContainer: {
      marginBottom: error.isError && error.message ? 12 : 0,
    },
  });

  return (
    <View style={style}>
      <View style={[styles.checkBoxContainer, computedStyles.checkBoxContainer]}>
        <Pressable
          onPress={handleChange}
          style={[styles.checkButtonContainer, computedStyles.checkButtonContainer, buttonStyle]}
        >
          {isChecked && <CheckIcon />}
        </Pressable>
        {text && (
          <Pressable onPress={handleChange}>
            <Text numberOfLines={1} style={[styles.checkBoxText, computedStyles.checkBoxText, textStyle]}>
              {text}
            </Text>
          </Pressable>
        )}
        {children}
      </View>
      {error.isError && error.message && (
        <Text style={[styles.errorText, computedStyles.errorText]}>{error.message}</Text>
      )}
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
    lineHeight: 14,
  },
  errorText: {
    fontSize: 12,
  },
});

export default CheckBox;
