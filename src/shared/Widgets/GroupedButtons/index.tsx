import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../core/themes/shadows';
import { useTheme } from '../../../core/themes/themeContext';
import Button from '../../BrandBook/Button';
import { ButtonModes } from '../../BrandBook/Button/props';
import { type GroupedButtonsProps } from './props';

const paddingGroupedButton = 5;

const GroupedButtons = ({
  style,
  firstTextButton,
  secondTextButton,
  isFirstButtonSelected,
  setIsFirstButtonSelected,
}: GroupedButtonsProps): JSX.Element => {
  const { colors } = useTheme();

  const [endButtonPosition, setEndButtonPosition] = useState(0);

  const translateX = useSharedValue(paddingGroupedButton);

  useEffect(() => {
    if (isFirstButtonSelected) {
      translateX.value = withTiming(paddingGroupedButton);
    } else {
      translateX.value = withTiming(endButtonPosition);
    }
  }, [isFirstButtonSelected, translateX, endButtonPosition]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const toggleButtonToStart = () => {
    setIsFirstButtonSelected(true);
  };

  const toggleButtonToEnd = () => {
    setIsFirstButtonSelected(false);
  };

  const computedStyles = StyleSheet.create({
    groupedButtons: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
    passiveTextColor: {
      color: colors.textSecondaryColor,
    },
    animatedToggleButton: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
  });

  return (
    <View style={style}>
      <Shadow stretch {...defaultShadow(colors.weakShadowColor)}>
        <View
          style={[styles.groupedButtons, computedStyles.groupedButtons]}
          onLayout={event => setEndButtonPosition(event.nativeEvent.layout.width / 2)}
        >
          <Animated.View style={[styles.animatedToggleButton, computedStyles.animatedToggleButton, animatedStyles]} />
          <Button
            mode={ButtonModes.Mode2}
            disableShadow
            text={firstTextButton}
            buttonStyle={styles.button}
            textStyle={isFirstButtonSelected ? {} : computedStyles.passiveTextColor}
            onPress={() => toggleButtonToStart()}
          />
          <Button
            mode={ButtonModes.Mode2}
            disableShadow
            text={secondTextButton}
            buttonStyle={styles.button}
            textStyle={!isFirstButtonSelected ? {} : computedStyles.passiveTextColor}
            onPress={() => toggleButtonToEnd()}
          />
        </View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  groupedButtons: {
    position: 'relative',
    padding: paddingGroupedButton,
    flexDirection: 'row',
    gap: 2,
    borderRadius: 30,
  },
  button: {
    backgroundColor: 'transparent',
  },
  animatedToggleButton: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    borderRadius: 30,
    zIndex: 0,
    top: paddingGroupedButton,
  },
});

export default GroupedButtons;
