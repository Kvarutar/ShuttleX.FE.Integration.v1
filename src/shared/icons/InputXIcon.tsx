import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const InputXIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 16 16" fill="none">
      <Path d="M12.2428 12.2552L3.99323 4.00565" stroke={svgColor} strokeWidth={1.33333} strokeLinecap="round" />
      <Path d="M3.75746 12.2565L12.007 4.00691" stroke={svgColor} strokeWidth={1.33333} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
});

export default InputXIcon;
