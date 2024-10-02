import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const PlusRoundIcon = ({
  style,
  color,
  backgroundColor,
}: {
  style?: StyleProp<ViewStyle>;
  color?: string;
  backgroundColor?: string;
}): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconTertiaryColor;
  const svgBackgroundColor = backgroundColor ?? '#FF3333';

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 22 22" fill="none">
      <Circle cx="11" cy="11" r="11" fill={svgBackgroundColor} />
      <Path d="M10 7H12V10H15V12H12V15H10V12H7V10H10V7Z" fill={svgColor} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
});

export default PlusRoundIcon;
