import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const CheckIcon2 = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }) => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;
  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M1 6.377l3.416 3.325a2 2 0 002.723.062L17 1" stroke={svgColor} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 12,
  },
});

export default CheckIcon2;
