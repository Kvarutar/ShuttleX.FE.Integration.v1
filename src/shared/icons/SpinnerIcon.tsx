import interpolate from 'color-interpolate';
import { Animated, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

const SpinnerIcon = ({
  size,
  strokeWidth,
  startColor,
  endColor,
}: {
  size: number;
  strokeWidth: number;
  startColor: string;
  endColor: string;
}) => {
  const { PI, cos, sin } = Math;
  const { multiply, subtract, Value } = Animated;
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const colors = [startColor, endColor];
  const palette = interpolate(colors);
  const r = size / 2 - strokeWidth / 2;
  const cx = size / 2;
  const cy = size / 2;
  const A = 2 * PI;
  const sampling = 2;
  const step = A / sampling;
  const x = (α: number) => cx - r * cos(α);
  const y = (α: number) => -r * sin(α) + cy;
  const arc = (α: number) => `A ${r} ${r} 0 0 1 ${x(α)} ${y(α)}`;
  const arcs = new Array(sampling).fill(0).map((_0, i) => {
    const α = i * step;
    return `M ${x(α)} ${y(α)} ${arc(α + step)}`;
  });

  const progress = new Value(0.5);
  const transition = new Value(0.5);
  const circumference = r * 2 * PI;
  const α = multiply(subtract(1, multiply(progress, transition)), PI * 2);
  const strokeDashoffset = subtract(circumference, multiply(α, -r));
  return (
    <Svg style={styles.svg} width={size} height={size}>
      <Defs>
        {arcs.map((_d, key) => {
          const isReversed = key / sampling >= 0.5;
          return (
            <LinearGradient key={key} id={`gradient-${key}`}>
              <Stop stopColor={palette(key / sampling)} offset={`${isReversed ? 100 : 0}%`} />
              <Stop stopColor={palette((key + 1) / sampling)} offset={`${isReversed ? 0 : 100}%`} />
            </LinearGradient>
          );
        })}
      </Defs>
      <G transform={`translate(${cx}, ${cy}) rotate(180) translate(${-cx}, ${-cy})`}>
        {arcs.map((d, key) => (
          <Path key={key} fill="transparent" stroke={`url(#gradient-${key})`} {...{ strokeWidth, d }} />
        ))}
      </G>
      <AnimatedCircle
        fill="transparent"
        strokeLinecap="round"
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeWidth={strokeWidth}
        strokeDashoffset={strokeDashoffset}
        r={r}
        cx={cx}
        cy={cy}
      />
      <Circle
        cx={strokeWidth}
        cy={strokeWidth}
        r={strokeWidth / 2}
        fill={endColor}
        x={r * 2 - strokeWidth / 2}
        y={r - strokeWidth / 2}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    transform: [{ rotateZ: '-90deg' }],
  },
});

export default SpinnerIcon;
