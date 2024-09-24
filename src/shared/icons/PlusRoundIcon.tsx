import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/v2/themeContext';

const PlusRoundIcon = ({
  style,
  color,
  backgroundColor,
}: {
  style?: StyleProp<ViewStyle>;
  color?: string;
  backgroundColor: string;
}): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconTertiaryColor;
  const svgBackgroundColor = backgroundColor ?? '#FF3333';

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" fill={svgBackgroundColor} />
      <Path d="M11.5 8.5H12.5V11.5H15.5V12.5H12.5V15.5H11.5V12.5H8.5V11.5H11.5V8.5Z" fill={svgColor} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default PlusRoundIcon;
