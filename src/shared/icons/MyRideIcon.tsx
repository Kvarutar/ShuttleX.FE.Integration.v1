import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const MyRideIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M9 7L15 4M15 17L21 20V7L15 4M15 17V4"
        stroke={svgColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default MyRideIcon;
