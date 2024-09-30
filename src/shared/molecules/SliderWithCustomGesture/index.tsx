import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '../../../core/themes/v2/themeContext';
import { type SliderWithCustomGestureProps } from './types';

const buttonPercentage = 0.2;
const padding = 8;

const SliderWithCustomGesture = ({
  onSwipeEnd,
  sliderElement,
  children,
  containerStyle,
  childrenStyle,
  rightToLeftSwipe,
}: SliderWithCustomGestureProps) => {
  const { colors } = useTheme();
  const translateX = useSharedValue(0);

  const [sliderWidth, setSliderWidth] = React.useState(0);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  const innerSliderWidth = sliderWidth - 2 * padding;
  const buttonWidth = innerSliderWidth * buttonPercentage;

  const computedStyles = StyleSheet.create({
    slider: {
      padding: padding,
      backgroundColor: colors.backgroundPrimaryColor,
      width: '100%',
      borderRadius: rightToLeftSwipe ? 13 : 100,
    },

    textInSlider: {
      color: colors.textSecondaryColor,
    },
  });

  const handleSwipeEnd = async () => {
    await onSwipeEnd();
    translateX.value = withTiming(0);
  };

  const gestureHandler = rightToLeftSwipe
    ? Gesture.Pan()
        .onUpdate(event => {
          translateX.value = Math.max(Math.min(event.translationX, 0), -(innerSliderWidth - buttonWidth));
        })
        .onEnd(() => {
          if (translateX.value < -(innerSliderWidth - buttonWidth) + 10) {
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
          if (translateX.value > innerSliderWidth - buttonWidth - 10) {
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
        <View style={[styles.childrenStyle, childrenStyle]}>{children}</View>
        <GestureDetector gesture={gestureHandler}>
          <Animated.View style={animatedButtonStyle}>{sliderElement}</Animated.View>
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
  },
  childrenStyle: {
    position: 'absolute',
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SliderWithCustomGesture;
