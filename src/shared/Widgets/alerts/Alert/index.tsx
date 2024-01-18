import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../../core/themes/shadows';
import { useTheme } from '../../../../core/themes/themeContext';
import { type AlertProps } from './props';

const screenWidth = Dimensions.get('window').width;
const disappearThreshold = screenWidth * 0.3;

const Alert = ({ children, style, isSwipeable = true, onClose }: AlertProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });

  const translateX = useSharedValue(0);
  const pan = Gesture.Pan()
    .onChange(event => {
      translateX.value = event.translationX;
    })
    .onEnd(event => {
      if (event.translationX > disappearThreshold) {
        translateX.value = withTiming(screenWidth, {}, () => onClose && runOnJS(onClose)());
      } else if (-event.translationX > disappearThreshold) {
        translateX.value = withTiming(-screenWidth, {}, () => onClose && runOnJS(onClose)());
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const component = (
    <Shadow stretch {...defaultShadow(colors.strongShadowColor)}>
      <View style={[styles.container, computedStyles.container, style]}>{children}</View>
    </Shadow>
  );

  if (isSwipeable) {
    return (
      <GestureDetector gesture={pan}>
        <Animated.View style={animatedStyles}>{component}</Animated.View>
      </GestureDetector>
    );
  }
  return <View>{component}</View>;
};

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    paddingHorizontal: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Alert;
