import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const HelpIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none">
      <Circle
        cx="14.8496"
        cy="14.8492"
        r="9.5"
        transform="rotate(45 14.8496 14.8492)"
        stroke={svgColor}
        strokeWidth={2}
      />
      <Circle
        cx="14.8496"
        cy="14.8497"
        r="3.66667"
        transform="rotate(45 14.8496 14.8497)"
        stroke={svgColor}
        strokeWidth={2}
      />
      <Path d="M21.7855 8.09217L17.6675 12.2102" stroke={svgColor} strokeWidth={2} />
      <Path d="M21.7848 21.2914L17.6668 17.1734" stroke={svgColor} strokeWidth={2} />
      <Path d="M12.7086 12.2172L8.59061 8.09916" stroke={svgColor} strokeWidth={2} />
      <Path d="M12.7113 17.1664L8.5933 21.2844" stroke={svgColor} strokeWidth={2} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default HelpIcon;
