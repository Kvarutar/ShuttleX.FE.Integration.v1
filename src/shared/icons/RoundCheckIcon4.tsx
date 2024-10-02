import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/v2/themeContext';

const RoundCheckIcon4 = ({
  style,
  innerColor,
  outerColor,
}: {
  style?: StyleProp<ViewStyle>;
  innerColor?: string;
  outerColor?: string;
}): JSX.Element => {
  const { colors } = useTheme();

  const innerSvgColor = innerColor ?? colors.iconPrimaryColor;
  const outerSvgColor = outerColor ?? colors.primaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="12" cy="12" r="12" fill={outerSvgColor} />
      <Path d="M8 13.5945L9.69889 15.1307L16.3928 9" stroke={innerSvgColor} strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default RoundCheckIcon4;
