import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const BecomeDriverIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={8.25} stroke={svgColor} strokeWidth={1.5} />
      <Path
        d="M12 14.25C10.7574 14.25 9.75 13.2426 9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25Z"
        stroke={svgColor}
        strokeWidth={1.5}
      />
      <Path d="M4 9L10.5 10.5" stroke={svgColor} strokeWidth={1.5} />
      <Path d="M20 9L14 10.5" stroke={svgColor} strokeWidth={1.5} />
      <Path d="M4 13H10" stroke={svgColor} strokeWidth={1.5} />
      <Path d="M10 20L11 14" stroke={svgColor} strokeWidth={1.5} />
      <Path d="M14 20L13 14" stroke={svgColor} strokeWidth={1.5} />
      <Path d="M20 13H14" stroke={svgColor} strokeWidth={1.5} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default BecomeDriverIcon;
