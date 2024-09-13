import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const CheckIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }) => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.checkIcon, style]} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <Path d="M7 12.377l1.36 2.12a2 2 0 003.32.07L17 7" stroke={svgColor} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  checkIcon: {
    width: 24,
    height: 24,
  },
});

export default CheckIcon;
