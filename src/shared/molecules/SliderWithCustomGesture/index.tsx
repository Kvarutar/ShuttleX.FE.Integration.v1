import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import { useTheme } from '../../../core/themes/themeContext';
import Text from '../../atoms/Text';
import { SwipeButtonModes } from '../SwipeButton/types';
import { useCreateRightToLeftGesture } from './hooks';
import { type SliderWithCustomGestureProps } from './types';

const buttonPercentage = 0.2;
const padding = 8;

const SliderWithCustomGesture = ({
  onSwipeEnd,
  sliderElement,
  text,
  textStyle,
  mode,
  containerStyle,
  wipeBlockStyle,
  rightToLeftSwipe,
  withWipeBlock = true,
  isActive,
  onSwipeStart,
  setIsLoading, // State for async requests, makes animation in SwipeButton component
}: SliderWithCustomGestureProps) => {
  const { t } = useTranslation();
  const { colors, themeMode } = useTheme();
  const translateX = useSharedValue(0);
  const lastTranslateX = useSharedValue(0);
  const isAtMiddle = useSharedValue(false);

  const [sliderWidth, setSliderWidth] = useState(0);
  const [innerSliderWidth, setInnerSliderWidth] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(0);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  useEffect(() => {
    if (sliderWidth > 0) {
      const newInnerSliderWidth = sliderWidth - 2 * padding;
      setInnerSliderWidth(newInnerSliderWidth);
      setButtonWidth(newInnerSliderWidth * buttonPercentage);
    }
  }, [sliderWidth]);

  // TODO: Remove conditions when we know how to change colors by theme
  // There're conditionaly colors while not known how to change button colors by theme
  const textColors = {
    confirm: themeMode === 'dark' ? colors.textTertiaryColor : colors.textPrimaryColor,
    decline: colors.errorColor,
    finish: themeMode === 'light' ? colors.textTertiaryColor : colors.textPrimaryColor,
    disabled: colors.textSecondaryColor,
  };

  const backgroundColors = {
    confirm: colors.primaryColor,
    decline: colors.errorColorWithOpacity,
    finish: colors.errorColor,
    disabled: colors.backgroundSecondaryColor,
  };

  const flatContainerStyle = StyleSheet.flatten(containerStyle);
  const backgroundColor = flatContainerStyle?.backgroundColor;

  const computedStyles = StyleSheet.create({
    text: {
      color: textColors[mode],
    },
    slider: {
      padding: padding,
      width: '100%',
      borderRadius: rightToLeftSwipe ? 13 : 100,
    },
    wipeBlock: {
      left: -sliderWidth + buttonWidth,
      backgroundColor: backgroundColor ?? backgroundColors[mode],
      top: -padding,
      bottom: -padding,
      right: -padding,
    },
  });

  const handleSwipeEnd = async () => {
    setIsLoading?.(true);
    await onSwipeEnd();
    lastTranslateX.value = translateX.value;
    translateX.value = withTiming(0);
    setIsLoading?.(false);
  };

  const rightToLeftGesture = useCreateRightToLeftGesture({
    translateX,
    lastTranslateX,
    isAtMiddle,
    innerSliderWidth,
    buttonWidth,
    mode,
    onSwipeEnd: handleSwipeEnd,
    onSwipeStart,
  });

  const defaultGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate(event => {
      if (mode !== SwipeButtonModes.Disabled) {
        translateX.value = Math.min(Math.max(event.translationX, 0), innerSliderWidth - buttonWidth);
      }
    })
    .onEnd(() => {
      if (translateX.value >= innerSliderWidth - buttonWidth) {
        runOnJS(handleSwipeEnd)();
      } else {
        translateX.value = withTiming(0);
      }
    });

  const gestureHandler = rightToLeftSwipe ? rightToLeftGesture : defaultGesture;

  const animatedSliderStyle = useAnimatedStyle(() => ({
    backgroundColor:
      (rightToLeftSwipe && translateX.value < 0) || !rightToLeftSwipe
        ? backgroundColors[mode]
        : colors.backgroundPrimaryColor,
  }));

  const animatedButtonStyle = useAnimatedStyle(() => {
    if (!isActive && translateX.value !== 0 && rightToLeftSwipe) {
      translateX.value = withSpring(0);
    }

    return {
      transform: [{ translateX: translateX.value }],
      width: rightToLeftSwipe ? '100%' : buttonWidth,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.slider, computedStyles.slider, animatedSliderStyle, containerStyle]}
        onLayout={handleLayout}
      >
        <Text style={[computedStyles.text, styles.text, textStyle]}>{text ?? t('SwipeButton_buttonHint')}</Text>
        <GestureDetector gesture={gestureHandler}>
          <Animated.View style={animatedButtonStyle}>
            {withWipeBlock && <View style={[styles.wipeBlock, computedStyles.wipeBlock, wipeBlockStyle]} />}
            {sliderElement}
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
  wipeBlock: {
    position: 'absolute',
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: 'Inter Bold',
    fontSize: 17,
  },
});

export default SliderWithCustomGesture;
