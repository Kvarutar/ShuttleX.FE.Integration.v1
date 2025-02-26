import { useEffect } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../../../core/themes/v2/themeContext';

const animationProperties = {
  numCards: 3,
  animationDuration: 200,
  delayBetween: 400,
};
const AnimatedDot = ({ index, computedStyle }: { index: number; computedStyle: StyleProp<ViewStyle> }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    const animate = () => {
      progress.value = withDelay(
        index * animationProperties.delayBetween,
        withSequence(
          withTiming(1, { duration: animationProperties.animationDuration, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: animationProperties.animationDuration }),
          withTiming(0, { duration: animationProperties.animationDuration, easing: Easing.inOut(Easing.ease) }),
        ),
      );
    };

    animate();
    const interval = setInterval(
      animate,
      animationProperties.numCards * animationProperties.delayBetween + animationProperties.animationDuration,
    );
    return () => clearInterval(interval);
  }, [index, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY =
      progress.value === 1
        ? withSpring(-2, { damping: 2, stiffness: 100 })
        : withSpring(0, { damping: 10, stiffness: 100 });

    return {
      opacity:
        progress.value === 1
          ? withTiming(1, { duration: animationProperties.animationDuration, easing: Easing.inOut(Easing.ease) })
          : withTiming(0.25, { duration: animationProperties.animationDuration, easing: Easing.inOut(Easing.ease) }),
      transform: [
        {
          scale: progress.value === 1 ? withSpring(1.2, { damping: 2, stiffness: 100 }) : withSpring(1),
        },
        { translateY },
      ],
    };
  });

  return <Animated.View style={[animatedStyle, styles.dot, computedStyle]} />;
};

export const LoadingAnimation3dots = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.outlineColor,
    },
    dot: {
      backgroundColor: colors.textPrimaryColor,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.container, computedStyles.container]}>
        {Array.from({ length: animationProperties.numCards }).map((_, index) => (
          <AnimatedDot key={index} index={index} computedStyle={[style, computedStyles.dot]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    gap: 3,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 16,
  },
});

export default LoadingAnimation3dots;
