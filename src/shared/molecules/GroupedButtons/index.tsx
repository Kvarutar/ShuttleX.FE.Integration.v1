import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../core/themes/shadows';
import { useTheme } from '../../../core/themes/themeContext';
import Button from '../../atoms/Button/v2';
import { type ButtonProps, CircleButtonModes } from '../../atoms/Button/v2/props';
import { GroupedButtonsMode, type GroupedButtonsProps } from './props';

const constants = {
  paddingGroupedButton: 2,
  animationDuration: 200,
};

const GroupedButtons = ({
  width,
  isFirstButtonSelected,
  setIsFirstButtonSelected,
  firstButtonText,
  secondButtonText,
  style,
  mode = GroupedButtonsMode.Light,
}: GroupedButtonsProps): JSX.Element => {
  const { colors } = useTheme();

  const [endButtonPosition, setEndButtonPosition] = useState(0);

  const translateX = useSharedValue(constants.paddingGroupedButton);

  useEffect(() => {
    if (isFirstButtonSelected) {
      translateX.value = withTiming(constants.paddingGroupedButton, { duration: constants.animationDuration });
    } else {
      translateX.value = withTiming(endButtonPosition, { duration: constants.animationDuration });
    }
  }, [isFirstButtonSelected, translateX, endButtonPosition]);

  const commonButtonProps: ButtonProps = {
    style: styles.button,
    mode: CircleButtonModes.Mode2,
    disableShadow: true,
    containerStyle: styles.buttonContainer,
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const isDarkMode = mode === GroupedButtonsMode.Dark;

  const getTextColor = (isSelected: boolean) => {
    if (isDarkMode) {
      return isSelected ? colors.textTertiaryColor : colors.textPrimaryColor;
    }
    return colors.textPrimaryColor;
  };

  const computedStyles = StyleSheet.create({
    groupedButtons: {
      backgroundColor: '#7676801F', //with opacity
    },
    animatedToggleButton: {
      backgroundColor: isDarkMode ? colors.backgroundTertiaryColor : colors.backgroundPrimaryColor,
    },
  });

  return (
    <View style={[{ width }, style]}>
      <Shadow stretch {...defaultShadow(colors.weakShadowColor)}>
        <View
          style={[styles.groupedButtons, computedStyles.groupedButtons]}
          onLayout={event => setEndButtonPosition(event.nativeEvent.layout.width / 2)}
        >
          <Animated.View style={[styles.animatedToggleButton, computedStyles.animatedToggleButton, animatedStyles]} />
          <Button
            {...commonButtonProps}
            text={firstButtonText}
            textStyle={[styles.buttonText, { color: getTextColor(isFirstButtonSelected) }]}
            onPress={() => setIsFirstButtonSelected(true)}
          />
          <Button
            {...commonButtonProps}
            text={secondButtonText}
            textStyle={[styles.buttonText, { color: getTextColor(!isFirstButtonSelected) }]}
            onPress={() => setIsFirstButtonSelected(false)}
          />
        </View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  groupedButtons: {
    position: 'relative',
    padding: constants.paddingGroupedButton,
    flexDirection: 'row',
    borderRadius: 30,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    height: 44,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  buttonText: {
    fontFamily: 'Inter Medium',
    fontSize: 13,
    letterSpacing: -0.08,
  },
  animatedToggleButton: {
    position: 'absolute',
    top: constants.paddingGroupedButton,
    bottom: constants.paddingGroupedButton,
    width: '50%',
    borderRadius: 30,
  },
});

export default GroupedButtons;
