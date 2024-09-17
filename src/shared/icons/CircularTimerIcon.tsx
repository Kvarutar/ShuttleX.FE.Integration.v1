import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  type SharedValue,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Line } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

//comp for animated marks
const AnimatedLineComponent = ({
  markAngle,
  progressAngle,
  marksColor,
  marksHeight,
  marksWidth,
  index,
  size,
  radius,
  strokeWidth,
}: {
  progressAngle: Readonly<SharedValue<number>>;
  markAngle: number;
  marksColor: string;
  marksWidth: number;
  marksHeight: number;
  radius: number;
  index: number;
  size: number;
  strokeWidth: number;
}) => {
  const animatedLineProps = useAnimatedProps(() => {
    if (index === 0) {
      return {
        stroke: marksColor,
        strokeWidth: marksWidth,
        strokeOpacity: 1,
      };
    }
    const activationProgress = interpolate(
      progressAngle.value,
      [Math.max(0, markAngle - 45), markAngle],
      [0, 1],
      'clamp',
    );

    const strokeOpacity = interpolate(activationProgress, [0, 1], [0.25, 1]);

    return {
      strokeOpacity,
      strokeWidth: marksWidth,
    };
  });

  const centerX = size / 2;
  const centerY = size / 2;
  const angleInRadians = ((markAngle - 90) * Math.PI) / 180;

  const x1 = centerX + (radius - strokeWidth / 2) * Math.cos(angleInRadians);
  const y1 = centerY + (radius - strokeWidth / 2) * Math.sin(angleInRadians);

  const x2 = centerX + (radius - strokeWidth / 2 + marksHeight) * Math.cos(angleInRadians);
  const y2 = centerY + (radius - strokeWidth / 2 + marksHeight) * Math.sin(angleInRadians);

  return (
    <AnimatedLine key={index} x1={x1} y1={y1} x2={x2} y2={y2} animatedProps={animatedLineProps} stroke={marksColor} />
  );
};

interface CircularTimerIconProps {
  initTime: number; //in milliseconds
  size: number;
  strokeWidth: number;
  marksWidth: number;
  marksHeight: number;
  strokeColor: string;
  marksColor: string;
  isCountingForward: boolean;
  padding: number;
  lineHeight: number;
  lineColor?: string;
}

const CircularTimerIcon: React.FC<CircularTimerIconProps> = ({
  initTime,
  size,
  isCountingForward,
  strokeWidth,
  strokeColor,
  marksColor,
  marksWidth,
  padding,
  lineHeight,
  marksHeight,
  lineColor,
}) => {
  const innerPadding = padding;
  const radius = (size - strokeWidth) / 2 - innerPadding;
  const cx = size / 2;
  const cy = size / 2;

  const circumference = radius * 2 * Math.PI;
  const numMarks = 8;
  const minuteMarks = Array.from({ length: numMarks }, (_, i) => (i / numMarks) * 360);

  const progress = useSharedValue(0);
  const progressAngle = useDerivedValue(() => progress.value * 360);

  const restartAnimation = useCallback(
    (isForward: boolean) => {
      cancelAnimation(progress);

      const currentTime = Date.now();
      const difference = initTime - currentTime;

      const targetValue = isForward ? 1 : 0;
      const time = isForward ? 1200000 : difference;
      progress.value = isForward ? 0 : 1;

      progress.value = withTiming(targetValue, {
        duration: time,
        easing: Easing.linear,
      });
    },
    [initTime, progress],
  );

  useEffect(() => {
    restartAnimation(isCountingForward);
  }, [restartAnimation, isCountingForward]);

  const progressIndicatorProps = useAnimatedProps(() => {
    const angle = progress.value * 2 * Math.PI - Math.PI / 2;
    const indicatorLength = lineHeight; // short mark
    const x1 = cx + (radius + 4) * Math.cos(angle);
    const y1 = cy + (radius + 4) * Math.sin(angle);
    const x2 = cx + (radius - indicatorLength) * Math.cos(angle);
    const y2 = cy + (radius - indicatorLength) * Math.sin(angle);
    return {
      x1,
      y1,
      x2,
      y2,
    };
  });

  //func for animated line
  const animatedCircleProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progress.value);
    return {
      strokeDashoffset,
    };
  });
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <AnimatedCircle
            cx={cx}
            cy={cy}
            r={radius}
            stroke={strokeColor}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeWidth={strokeWidth}
            fill="transparent"
            animatedProps={animatedCircleProps}
            strokeLinecap="butt"
          />
        </G>
        <AnimatedLine stroke={lineColor} strokeWidth={2} animatedProps={progressIndicatorProps} />
        {minuteMarks.map((markAngle, index) => (
          <AnimatedLineComponent
            key={index}
            size={size}
            radius={radius}
            strokeWidth={strokeWidth}
            marksWidth={marksWidth}
            marksHeight={marksHeight}
            markAngle={markAngle}
            progressAngle={progressAngle}
            marksColor={marksColor}
            index={index}
          />
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircularTimerIcon;
