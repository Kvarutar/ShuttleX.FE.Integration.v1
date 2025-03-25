import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

import { useTheme } from '../../../core/themes/themeContext';
import { type ButtonAnimationProps, type ButtonAnimationRef } from './types';

const ButtonAnimation = forwardRef<ButtonAnimationRef, ButtonAnimationProps>(
  ({ time, children, onAnimationEnd }, ref) => {
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const [opacity, setOpacity] = useState(0.09);

    const { colors } = useTheme();
    const strokeColor = colors.iconPrimaryColor;

    const size = 92;
    const strokeWidth = 6;
    const padding = strokeWidth;
    const cx = size / 2;
    const cy = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    const progress = useSharedValue(0);

    const startAnimation = useCallback(() => {
      setOpacity(0.09);
      progress.value = 0;
      progress.value = withTiming(
        1,
        {
          duration: time,
          easing: Easing.linear,
        },
        finished => {
          if (finished) {
            runOnJS(setOpacity)(1);
            runOnJS(onAnimationEnd)();
          }
        },
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress, time]);

    useImperativeHandle(ref, () => ({
      restartAnimation: () => {
        startAnimation();
      },
    }));

    useEffect(() => {
      startAnimation();
    }, [time, startAnimation]);

    const animatedCircleProps = useAnimatedProps(() => ({ strokeDashoffset: circumference * (1 - progress.value) }));

    return (
      <View style={styles.container}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={`${cx}, ${cy}`}>
            <AnimatedCircle
              cx={cx}
              cy={cy}
              r={radius}
              stroke={strokeColor}
              opacity={opacity}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <Circle
              cx={cx}
              cy={cy}
              r={radius - padding / 2}
              stroke="white"
              opacity={0.28}
              strokeWidth={1}
              fill="transparent"
            />
            <AnimatedCircle
              cx={cx}
              cy={cy}
              r={radius}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference}, ${circumference}`}
              fill="transparent"
              animatedProps={animatedCircleProps}
              strokeLinecap="butt"
            />
          </G>
        </Svg>
        <View style={styles.buttonContainer}>{children}</View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonAnimation;
