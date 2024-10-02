import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const WarningIcon = ({
  style,
  color,
  lineColor,
}: {
  style?: StyleProp<ViewStyle>;
  color?: string;
  lineColor?: string;
}): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.errorColor;
  const defaultLineColor = lineColor ?? colors.iconTertiaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 32 32" fill="none">
      <Circle cx={15} cy={15} r={15} fill={svgColor} />
      <Circle cx={15} cy={15} r={10} stroke={defaultLineColor} strokeWidth={2} />
      <Path d="M15 16V10" stroke={defaultLineColor} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={15} cy={20} r={1.5} fill={defaultLineColor} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

export default WarningIcon;
