import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const HelpIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none">
      <Circle cx={13} cy={13.0014} r={8} transform="rotate(45 13 13.0014)" stroke={svgColor} strokeWidth={2} />
      <Circle cx={13} cy={13.0006} r={3} transform="rotate(45 13 13.0006)" stroke={svgColor} strokeWidth={2} />
      <Path d="M18.9434 7.20902L15.4137 10.7387" stroke={svgColor} strokeWidth={2} />
      <Path d="M18.9433 18.5215L15.4136 14.9918" stroke={svgColor} strokeWidth={2} />
      <Path d="M11.166 10.7442L7.63626 7.21446" stroke={svgColor} strokeWidth={2} />
      <Path d="M11.1661 14.9864L7.63633 18.5161" stroke={svgColor} strokeWidth={2} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export default HelpIcon;
