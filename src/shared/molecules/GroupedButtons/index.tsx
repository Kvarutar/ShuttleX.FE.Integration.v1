import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../core/themes/shadows';
import { useThemeV1 } from '../../../core/themes/v1/themeContext';
import { ButtonV1 } from '../../atoms/Button';
import { ButtonV1Modes, type ButtonV1Props } from '../../atoms/Button/V1/props';
import { type GroupedButtonsProps } from './props';

const constants = {
  paddingGroupedButton: 5,
  animationDuration: 200,
};

const GroupedButtons = ({
  width,
  isFirstButtonSelected,
  setIsFirstButtonSelected,
  firstButtonText,
  secondButtonText,
  style,
}: GroupedButtonsProps): JSX.Element => {
  const { colors, themeMode } = useThemeV1();

  const [endButtonPosition, setEndButtonPosition] = useState(0);

  const translateX = useSharedValue(constants.paddingGroupedButton);

  useEffect(() => {
    if (isFirstButtonSelected) {
      translateX.value = withTiming(constants.paddingGroupedButton, { duration: constants.animationDuration });
    } else {
      translateX.value = withTiming(endButtonPosition, { duration: constants.animationDuration });
    }
  }, [isFirstButtonSelected, translateX, endButtonPosition]);

  const commonButtonProps: ButtonV1Props = {
    mode: ButtonV1Modes.Mode2,
    disableShadow: true,
    style: styles.button,
    containerStyle: styles.buttonContainer,
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const computedStyles = StyleSheet.create({
    groupedButtons: {
      backgroundColor: themeMode === 'light' ? colors.backgroundPrimaryColor : colors.backgroundSecondaryColor,
    },
    passiveTextColor: {
      color: colors.textSecondaryColor,
    },
    animatedToggleButton: {
      backgroundColor: themeMode === 'light' ? colors.backgroundSecondaryColor : colors.backgroundTertiaryColor,
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
          <ButtonV1
            {...commonButtonProps}
            text={firstButtonText}
            textStyle={isFirstButtonSelected ? undefined : computedStyles.passiveTextColor}
            onPress={() => setIsFirstButtonSelected(true)}
          />
          <ButtonV1
            {...commonButtonProps}
            text={secondButtonText}
            textStyle={!isFirstButtonSelected ? undefined : computedStyles.passiveTextColor}
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
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
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
