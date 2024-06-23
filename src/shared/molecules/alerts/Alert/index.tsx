import { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../../core/themes/shadows';
import { useTheme } from '../../../../core/themes/themeContext';
import { type AlertProps } from './props';

const screenWidth = Dimensions.get('window').width;
const disappearThreshold = screenWidth * 0.3;
const closeAnimationDuration = 200;

const Alert = ({ children, style, isClosable = true, closeTimeout, onClose }: AlertProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });

  const translateX = useSharedValue(0);

  const playCloseAnimation = useCallback(
    (hideDirection: 'left' | 'right') => {
      translateX.value = withTiming(
        hideDirection === 'left' ? -screenWidth : screenWidth,
        { duration: closeAnimationDuration },
        () => onClose && runOnJS(onClose)(),
      );
    },
    [translateX, onClose],
  );

  const pan = Gesture.Pan()
    .onChange(event => {
      translateX.value = event.translationX;
    })
    .onEnd(event => {
      if (event.translationX > disappearThreshold) {
        runOnJS(playCloseAnimation)('right');
      } else if (-event.translationX > disappearThreshold) {
        runOnJS(playCloseAnimation)('left');
      } else {
        translateX.value = withTiming(0);
      }
    });

  useEffect(() => {
    if (closeTimeout !== undefined) {
      setTimeout(() => playCloseAnimation('left'), closeTimeout);
    }
  }, [closeTimeout, playCloseAnimation]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const component = (
    <Shadow stretch {...defaultShadow(colors.strongShadowColor)}>
      <View style={[styles.container, computedStyles.container, style]}>{children}</View>
    </Shadow>
  );

  if (isClosable) {
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
