import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '../../../core/themes/v2/themeContext';
import Text from '../../atoms/Text';
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
  rightToLeftSwipe,
  setIsLoading,
}: SliderWithCustomGestureProps) => {
  const { t } = useTranslation();
  const { colors, themeMode } = useTheme();
  const translateX = useSharedValue(0);

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
  };

  const backgroundColors = {
    confirm: colors.primaryColor,
    decline: colors.errorColorWithOpacity,
    finish: colors.errorColor,
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
      backgroundColor: backgroundColors[mode],
    },
    wipeBlock: {
      left: -sliderWidth + buttonWidth,
      width: sliderWidth,
      backgroundColor: backgroundColor ?? backgroundColors[mode],
    },
  });

  const handleSwipeEnd = async () => {
    setIsLoading(true);
    await onSwipeEnd();
    translateX.value = withTiming(0);
    setIsLoading(false);
  };

  //TODO: Refactor this methods
  const gestureHandler = rightToLeftSwipe
    ? Gesture.Pan()
        .onUpdate(event => {
          translateX.value = Math.max(Math.min(event.translationX, 0), -(innerSliderWidth - buttonWidth));
        })
        .onEnd(() => {
          if (translateX.value <= -(innerSliderWidth - buttonWidth)) {
            runOnJS(handleSwipeEnd)();
          } else {
            translateX.value = withTiming(0);
          }
        })
    : Gesture.Pan()
        .onUpdate(event => {
          translateX.value = Math.min(Math.max(event.translationX, 0), innerSliderWidth - buttonWidth);
        })
        .onEnd(() => {
          if (translateX.value >= innerSliderWidth - buttonWidth) {
            runOnJS(handleSwipeEnd)();
          } else {
            translateX.value = withTiming(0);
          }
        });

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: rightToLeftSwipe ? '100%' : buttonWidth,
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.slider, computedStyles.slider, containerStyle]} onLayout={handleLayout}>
        <Text style={[computedStyles.text, styles.text, textStyle]}>{text ?? t('SwipeButton_buttonHint')}</Text>
        <GestureDetector gesture={gestureHandler}>
          <Animated.View style={animatedButtonStyle}>
            <View style={[styles.wipeBlock, computedStyles.wipeBlock]} />
            {sliderElement}
          </Animated.View>
        </GestureDetector>
      </View>
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
    backgroundColor: 'green',
    height: 48,
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
