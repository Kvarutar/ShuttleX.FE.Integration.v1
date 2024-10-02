import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const ArrowInPrimaryColorIcon = ({
  style,
  color,
  lineColor,
}: {
  color?: string;
  lineColor?: string;
  style?: StyleProp<ViewStyle>;
}): JSX.Element => {
  const { colors } = useTheme();
  const backgroundColor = color ?? colors.backgroundSecondaryColor;
  const arrowColor = lineColor ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
      <Circle cx={16} cy={16} r={16} fill={backgroundColor} />
      <Path d="M14 11L18 16L14 21" stroke={arrowColor} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

export default ArrowInPrimaryColorIcon;
