import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const RoundCheckIcon2 = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg style={[styles.RoundCheckIcon2, style]} viewBox="0 0 36 36" fill="none">
      <Circle cx={18} cy={18} r={18} fill={svgColor} />
      <Path
        d="M13.5 18.6431L16.2854 21.0304C16.573 21.277 17.004 21.253 17.2625 20.976L23.4 14.4004"
        stroke="black"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  RoundCheckIcon2: {
    width: 36,
    height: 36,
  },
});

export default RoundCheckIcon2;
