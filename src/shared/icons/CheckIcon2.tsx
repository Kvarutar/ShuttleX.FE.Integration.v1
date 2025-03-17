import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const CheckIcon2 = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }) => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;
  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M2 6.66405L4.83391 9.22653L13 2" stroke={svgColor} strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 15,
    height: 11,
  },
});

export default CheckIcon2;
