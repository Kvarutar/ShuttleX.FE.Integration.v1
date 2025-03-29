import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const StatisticsIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={13} width={4} height={6} rx={1} stroke={svgColor} strokeWidth={2} />
      <Rect x={17} y={5} width={4} height={14} rx={1} stroke={svgColor} strokeWidth={2} />
      <Rect x={10} y={9} width={4} height={10} rx={1} stroke={svgColor} strokeWidth={2} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default StatisticsIcon;
