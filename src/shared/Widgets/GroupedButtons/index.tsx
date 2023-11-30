import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../core/themes/shadows';
import { useTheme } from '../../../core/themes/themeContext';
import Button from '../../BrandBook/Button';
import { ButtonModes } from '../../BrandBook/Button/props';
import { type GroupedButtonsProps } from './props';

const GroupedButtons = ({
  style,
  firstTextButton,
  secondTextButton,
  isFirstSelectedButton,
  setIsFirstSelectedButton,
}: GroupedButtonsProps): JSX.Element => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    groupedButtons: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
    activeButton: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
    passiveTextColor: {
      color: colors.textSecondaryColor,
    },
  });

  return (
    <Shadow stretch {...defaultShadow(colors.weakShadowColor)}>
      <View style={[styles.groupedButtons, computedStyles.groupedButtons, style]}>
        <Button
          mode={ButtonModes.Mode2}
          disableShadow
          text={firstTextButton}
          style={isFirstSelectedButton ? computedStyles.activeButton : styles.passiveButton}
          textStyle={isFirstSelectedButton ? {} : computedStyles.passiveTextColor}
          onPress={() => setIsFirstSelectedButton(true)}
        />
        <Button
          mode={ButtonModes.Mode2}
          disableShadow
          text={secondTextButton}
          style={!isFirstSelectedButton ? computedStyles.activeButton : styles.passiveButton}
          textStyle={!isFirstSelectedButton ? {} : computedStyles.passiveTextColor}
          onPress={() => setIsFirstSelectedButton(false)}
        />
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  groupedButtons: {
    padding: 5,
    flexDirection: 'row',
    gap: 2,
    borderRadius: 30,
  },
  passiveButton: {
    backgroundColor: 'transparent',
  },
});

export default GroupedButtons;
