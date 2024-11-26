import { useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import i18nIntegration from '../../../../core/locales/i18n';
import { defaultShadow } from '../../../../core/themes/shadows';
import { useTheme } from '../../../../core/themes/v2/themeContext';
import ArrowIcon from '../../../icons/ArrowIcon';
import SpinnerIcon from '../../../icons/SpinnerIcon';
import SliderWithCustomGesture from '../../SliderWithCustomGesture';
import { type SwipeButtonColors, SwipeButtonModes, type SwipeButtonProps } from '../types';

const SwipeButtonWithoutI18n = ({
  onSwipeEnd,
  mode,
  text,
  containerStyle,
  textStyle,
}: SwipeButtonProps): JSX.Element => {
  const { colors, themeMode } = useTheme();
  const shadowProps = defaultShadow(colors.weakShadowColor);

  const [isLoading, setIsLoading] = useState(false);

  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  const isDisabledMode = mode === SwipeButtonModes.Disabled;

  if (isLoading) {
    rotate.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1, // infinity
    );
  } else {
    rotate.value = 0;
  }

  const swipeButtonColors: Record<typeof themeMode, SwipeButtonColors> = {
    light: {
      startColor: colors.iconSecondaryColor,
      endColor: colors.iconTertiaryColor,
      buttonBgColor: isLoading || isDisabledMode ? colors.backgroundSecondaryColor : colors.backgroundPrimaryColor,
    },
    dark: {
      startColor: colors.iconTertiaryColor,
      endColor: colors.iconSecondaryColor,
      buttonBgColor: isLoading || isDisabledMode ? colors.backgroundSecondaryColor : colors.backgroundPrimaryColor,
    },
    test: {
      startColor: colors.iconTertiaryColor,
      endColor: colors.iconSecondaryColor,
      buttonBgColor: isLoading || isDisabledMode ? colors.backgroundSecondaryColor : colors.backgroundPrimaryColor,
    },
  };

  const computedStyles = StyleSheet.create({
    button: {
      backgroundColor: swipeButtonColors[themeMode].buttonBgColor,
      borderColor: isDisabledMode ? colors.borderColor : undefined,
      borderWidth: isDisabledMode ? 1 : 0,
    },
  });

  return (
    <Shadow stretch {...shadowProps}>
      <SliderWithCustomGesture
        onSwipeEnd={onSwipeEnd}
        containerStyle={containerStyle}
        text={text}
        mode={mode}
        textStyle={textStyle}
        setIsLoading={setIsLoading}
        sliderElement={
          <Pressable style={[styles.button, computedStyles.button]}>
            {isLoading ? (
              <Animated.View style={animatedStyle}>
                <SpinnerIcon
                  size={16}
                  startColor={swipeButtonColors[themeMode].startColor}
                  endColor={swipeButtonColors[themeMode].endColor}
                  strokeWidth={2}
                />
              </Animated.View>
            ) : (
              <ArrowIcon color={isDisabledMode ? colors.iconSecondaryColor : undefined} />
            )}
          </Pressable>
        }
      />
    </Shadow>
  );
};

const SwipeButton = ({
  onSwipeEnd,
  mode = SwipeButtonModes.Confirm,
  text,
  containerStyle,
  textStyle,
}: SwipeButtonProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <SwipeButtonWithoutI18n
      onSwipeEnd={onSwipeEnd}
      mode={mode}
      text={text}
      containerStyle={containerStyle}
      textStyle={textStyle}
    />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 100,
  },
});

export default SwipeButton;
