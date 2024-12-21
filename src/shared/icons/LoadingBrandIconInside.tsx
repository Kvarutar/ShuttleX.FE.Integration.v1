import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const LoadingBrandIconInside = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }) => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.9411 16.041H16.957V32.025C16.957 23.2003 24.1127 16.0442 32.9411 16.041Z"
        fill={svgColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.972998 16.041L16.957 16.041L16.957 0.0569859C16.957 8.88177 9.80131 16.0378 0.972998 16.041Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 33,
    height: 33,
  },
});

export default LoadingBrandIconInside;
