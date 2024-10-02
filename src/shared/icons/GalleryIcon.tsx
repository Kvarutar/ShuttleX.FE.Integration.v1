import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const GalleryIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 24 24" fill="none">
      <Circle cx={16} cy={8} r={2} stroke={svgColor} strokeWidth={1.5} />
      <Path
        d="M2 12.5l1.752-1.533a2.3 2.3 0 013.14.105l4.29 4.29a2 2 0 002.564.222l.299-.21a3 3 0 013.731.225L21 18.5"
        stroke={svgColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464.974.974 1.3 2.343 1.41 4.536"
        stroke={svgColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default GalleryIcon;
