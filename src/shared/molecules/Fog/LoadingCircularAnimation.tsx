import { useCallback, useEffect } from 'react';
import { AppState, Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const animationProperties = {
  dotSize: 10,
  groupSize: 4,
  baseSpeed: 2400,
  delayGap: 300,
  angleGap: 2,
};

const windowWidth = Dimensions.get('window').width;
const reducedWidth = windowWidth * 0.96;

const AnimatedDot = ({ index }: { index: number }) => {
  const rotation = useSharedValue(90);

  const startAnimation = useCallback(() => {
    const defaultAngle = (animationProperties.groupSize - 1 - index) * animationProperties.angleGap;
    const startAngle = 90 + defaultAngle;
    const endAngle = 270 + defaultAngle;

    rotation.value = startAngle;
    rotation.value = withDelay(
      index * animationProperties.delayGap,
      withRepeat(
        withTiming(endAngle, {
          duration: animationProperties.baseSpeed,
          easing: Easing.inOut(Easing.cubic),
        }),
        -1,
        false,
      ),
    );
  }, [index, rotation]);
  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        startAnimation();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [startAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    zIndex: animationProperties.groupSize - index,
  }));

  const computedStyles = StyleSheet.create({
    circle: {
      width: animationProperties.dotSize,
      height: animationProperties.dotSize,
      borderRadius: animationProperties.dotSize * 2,
    },
  });

  return (
    <Animated.View style={[styles.lineContainer, animatedStyle]}>
      <View style={[styles.circle, computedStyles.circle]} />
      <View style={[styles.circle, styles.rightCircle, computedStyles.circle]} />
    </Animated.View>
  );
};

const LoadingCircularAnimation = ({ widthInPercents }: { widthInPercents: string }) => {
  const diameter = (Number(widthInPercents.slice(0, -1)) / 100) * reducedWidth;

  const computedStyles = StyleSheet.create({
    linesContainer: {
      width: diameter,
    },
    container: {
      height: diameter,
    },
  });

  return (
    <View style={[styles.container, computedStyles.container]}>
      <View style={computedStyles.linesContainer}>
        {Array.from({ length: animationProperties.groupSize }).map((_, index) => (
          <AnimatedDot key={index} index={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    left: 2,
    backgroundColor: '#BBBBBB',
  },
  rightCircle: {
    left: 'auto',
    right: 2,
  },
});

export default LoadingCircularAnimation;
