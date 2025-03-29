import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  createAnimatedPropAdapter,
  Easing,
  interpolate,
  interpolateColor,
  processColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';

import { useTheme } from '../../../core/themes/themeContext';
import { type AnimatedLineComponentProps, type CircularProps } from './props';

const AnimatedLine = Animated.createAnimatedComponent(Line);

// Need it for animation working on Android without errors
const adapter = createAnimatedPropAdapter(
  props => {
    if (Object.keys(props).includes('stroke')) {
      props.stroke = {
        type: 0,
        payload: processColor(props.stroke as string),
      };
    }
  },
  ['stroke'],
);

const AnimatedLineComponent = ({
  markAngle,
  progressAngle,
  marksColorFilled,
  marksColorNotFilled,
  marksHeight,
  marksWidth,
  index,
  size,
  radius,
}: AnimatedLineComponentProps) => {
  const animatedLineProps = useAnimatedProps(
    () => {
      const activationProgress = interpolate(progressAngle.value, [markAngle - 1, markAngle], [0, 1], 'clamp');
      const strokeColor = interpolateColor(activationProgress, [0, 1], [marksColorNotFilled, marksColorFilled]);

      return {
        stroke: strokeColor,
        strokeWidth: marksWidth,
      };
    },
    [],
    adapter,
  );

  const centerX = size / 2;
  const centerY = size / 2;
  const angleInRadians = ((markAngle - 90) * Math.PI) / 180;

  const x1 = centerX + radius * Math.cos(angleInRadians);
  const y1 = centerY + radius * Math.sin(angleInRadians);

  const x2 = centerX + (radius + marksHeight) * Math.cos(angleInRadians);
  const y2 = centerY + (radius + marksHeight) * Math.sin(angleInRadians);

  return (
    <AnimatedLine
      key={index}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      animatedProps={animatedLineProps}
      stroke={marksColorFilled}
    />
  );
};

const CircleAnimatedProgress: React.FC<CircularProps> = ({
  size = 253,
  completionPercentage,
  marksColorFilled,
  marksColorNotFilled,
  marksWidth = 2.5,
  marksHeight = 30,
  padding = 36,
  children,
  contentContainerStyle, // styles for children's container
  animationDuration = 1000, // in milliseconds
}) => {
  const { colors } = useTheme();

  const radius = size / 2 - padding;
  const numMarks = 100;
  const minuteMarks = Array.from({ length: numMarks }, (_, i) => (i / numMarks) * 360);

  const progress = useSharedValue(0);
  const progressAngle = useDerivedValue(() => progress.value * 360);

  useEffect(() => {
    cancelAnimation(progress);

    const targetValue = completionPercentage / 100;
    progress.value = 0;

    progress.value = withTiming(targetValue, {
      duration: animationDuration,
      easing: Easing.elastic(0.6),
    });
  }, [progress, completionPercentage, animationDuration]);

  const childrenContainerSize = size / 2;

  const computedStyles = StyleSheet.create({
    childrenContainer: {
      width: childrenContainerSize,
      height: childrenContainerSize,
    },
  });
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {minuteMarks.map((markAngle, index) => (
          <AnimatedLineComponent
            key={index}
            size={size}
            radius={radius}
            marksWidth={marksWidth}
            marksHeight={marksHeight}
            markAngle={markAngle}
            progressAngle={progressAngle}
            marksColorFilled={marksColorFilled ?? colors.primaryColor}
            marksColorNotFilled={marksColorNotFilled ?? colors.iconSecondaryColor}
            index={index}
          />
        ))}
      </Svg>
      <View style={[styles.childrenContainer, computedStyles.childrenContainer, contentContainerStyle]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  childrenContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default CircleAnimatedProgress;
