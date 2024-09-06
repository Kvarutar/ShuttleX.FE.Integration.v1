import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
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
  strokeColor,
  markAngle,
  progressAngle,
  marksColor,
  marksHeight,
  marksWidth,
  index,
  opacity,
  size,
  radius,
  strokeWidth,
}: {
  progressAngle: Readonly<SharedValue<number>>;
  markAngle: number;
  strokeColor: string;
  marksColor: string;
  marksWidth: number;
  marksHeight: number;
  radius: number;
  index: number;
  opacity: number;
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

    return {
      strokeOpacity: interpolate(activationProgress, [0.99, 1], [opacity, 1], 'clamp'),
      stroke: interpolateColor(activationProgress, [0.99, 1], [strokeColor, marksColor]),
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

  return <AnimatedLine key={index} x1={x1} y1={y1} x2={x2} y2={y2} animatedProps={animatedLineProps} />;
};

interface CircularTimerIconProps {
  initTime: number; //in milliseconds
  size: number;
  strokeWidth: number;
  marksWidth: number;
  marksHeight: number;
  opacity: number;
  strokeColor: string;
  marksColor: string;
  isWithMarks?: boolean;
}

const CircularTimerIcon: React.FC<CircularTimerIconProps> = ({
  initTime,
  size,
  opacity,
  strokeWidth,
  strokeColor,
  marksColor,
  marksWidth,
  marksHeight,
  isWithMarks,
}) => {
  const padding = isWithMarks ? 8 : 0;
  const radius = (size - strokeWidth) / 2 - padding;
  const cx = size / 2;
  const cy = size / 2;

  const circumference = radius * 2 * Math.PI;
  const numMarks = 8;
  const minuteMarks = Array.from({ length: numMarks }, (_, i) => (i / numMarks) * 360);

  const progress = useSharedValue(0);
  const progressAngle = useDerivedValue(() => progress.value * 360);
  const width = useSharedValue(strokeWidth);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: initTime,
      easing: Easing.linear,
    });
  }, [initTime, progress]);

  //func for animated line
  const animatedCircleProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progress.value);
    const thinStrokeWidth = isWithMarks
      ? width.value
      : interpolate(progress.value, [0.99, 1], [width.value, 1], 'clamp');
    return {
      strokeDashoffset,
      strokeWidth: thinStrokeWidth,
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
            fill="transparent"
            strokeDasharray={`${circumference} ${circumference}`}
            animatedProps={animatedCircleProps}
            strokeLinecap="butt"
            strokeOpacity={opacity}
          />
        </G>
        {isWithMarks &&
          minuteMarks.map((markAngle, index) => (
            <AnimatedLineComponent
              key={index}
              size={size}
              radius={radius}
              opacity={opacity}
              strokeWidth={strokeWidth}
              marksWidth={marksWidth}
              marksHeight={marksHeight}
              strokeColor={strokeColor}
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
