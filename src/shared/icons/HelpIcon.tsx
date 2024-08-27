import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useThemeV1 } from '../../core/themes/v1/themeContext';

const HelpIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useThemeV1();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_4005_3297)">
        <Circle cx={12} cy={11.7279} r={8.25} transform="rotate(45 12 11.7279)" stroke={svgColor} strokeWidth={1.5} />
        <Circle cx={12} cy={11.7272} r={3.25} transform="rotate(45 12 11.7272)" stroke={svgColor} strokeWidth={1.5} />
        <Path d="M17.9434 5.93558L14.4137 9.46531" stroke={svgColor} strokeWidth={1.5} />
        <Path d="M17.9433 17.25L14.4136 13.7203" stroke={svgColor} strokeWidth={1.5} />
        <Path d="M10.166 9.47269L6.63626 5.94297" stroke={svgColor} strokeWidth={1.5} />
        <Path d="M10.1661 13.7149L6.63633 17.2446" stroke={svgColor} strokeWidth={1.5} />
      </G>
      <Defs>
        <ClipPath id="clip0_4005_3297">
          <Rect width={24} height={24} fill={colors.backgroundPrimaryColor} />
        </ClipPath>
      </Defs>
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
