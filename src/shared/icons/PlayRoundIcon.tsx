import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const PlayRoundIcon = ({
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
      <Path
        d="M36 57.806V32.194C36 30.4296 37.8962 29.3893 39.2879 30.3904L57.0923 43.1963C58.3026 44.0668 58.3026 45.9332 57.0923 46.8037L39.2879 59.6096C37.8962 60.6107 36 59.5704 36 57.806Z"
        stroke={svgColor}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 90,
    height: 90,
  },
});

export default PlayRoundIcon;
