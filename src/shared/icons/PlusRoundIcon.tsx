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
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
      <Circle cx="12" cy="12" r="12" fill={svgBackgroundColor} />
      <Path d="M11 8H13V11H16V13H13V16H11V13H8V11H11V8Z" fill={svgColor} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

export default PlusRoundIcon;
