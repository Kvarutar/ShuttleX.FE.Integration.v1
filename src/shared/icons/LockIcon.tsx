import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const LockIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 24 24" fill="none">
      <Rect x={11} y={15} width={2} height={3} rx={1} fill={svgColor} />
      <Circle cx={12} cy={14} r={2} fill={svgColor} />
      <Rect x={4.75} y={9.75} width={14.5} height={10.5} rx={2.25} stroke={svgColor} strokeWidth={1.5} />
      <Path d="M8 9.5V8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V10" stroke={svgColor} strokeWidth={1.5} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default LockIcon;
