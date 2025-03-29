import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const PauseRoundIcon = ({
  style,
  color,
  backgroundColor,
}: {
  style?: StyleProp<ViewStyle>;
  color?: string;
  backgroundColor?: string;
}): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textPrimaryColor;
  const svgBackgroundColor = backgroundColor ?? '#D9D9D94C';

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 90 90" fill="none">
      <Path
        d="M45 90C69.8528 90 90 69.8528 90 45C90 20.1472 69.8528 0 45 0C20.1472 0 0 20.1472 0 45C0 69.8528 20.1472 90 45 90Z"
        fill={svgBackgroundColor}
      />
      <Path d="M33 29V61H38V29H33Z" fill={svgColor} />
      <Path d="M52.199 29L52.1953 61L56.9953 61.0006L56.999 29.0006L52.199 29Z" fill={svgColor} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 90,
    height: 90,
  },
});

export default PauseRoundIcon;
