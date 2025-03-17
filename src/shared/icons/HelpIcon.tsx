import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const HelpIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="2 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9.5" stroke={svgColor} strokeWidth={2} />
      <Circle cx="12" cy="12" r="3.66667" stroke={svgColor} strokeWidth={2} />
      <Path d="M18.071 5.929L14.121 9.879" stroke={svgColor} strokeWidth={2} />
      <Path d="M18.071 18.071L14.121 14.121" stroke={svgColor} strokeWidth={2} />
      <Path d="M9.879 9.879L5.929 5.929" stroke={svgColor} strokeWidth={2} />
      <Path d="M9.879 14.121L5.929 18.071" stroke={svgColor} strokeWidth={2} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default HelpIcon;
