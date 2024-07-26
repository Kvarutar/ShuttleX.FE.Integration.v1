import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const FeedbackWheelIcon = ({
  style,
  color,
  backgroundColor,
}: {
  style?: StyleProp<ViewStyle>;
  color?: string;
  backgroundColor?: string;
}): JSX.Element => {
  const { colors, themeMode } = useTheme();

  const color1 = backgroundColor ?? (themeMode === 'light' ? colors.iconPrimaryColor : colors.iconTertiaryColor);
  const color2 = color ?? (themeMode === 'light' ? colors.iconTertiaryColor : colors.iconPrimaryColor);

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none">
      <Rect width={30} height={30} rx={8} fill={color1} />
      <Circle cx={15} cy={15} r={8.25} stroke={color2} strokeWidth={1.5} />
      <Circle cx={15} cy={15} r={2.25} stroke={color2} strokeWidth={1.5} />
      <Path d="M12.5 14.5L7 13" stroke={color2} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M17.5 14.5L23 13" stroke={color2} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M15 17.5V23" stroke={color2} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default FeedbackWheelIcon;
