import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const PenIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();

  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.PenIcon, style]} viewBox="0 0 27 27" fill="none">
      <Rect
        x="20.4727"
        y="0.472656"
        width="8.59819"
        height="4.32827"
        rx="1"
        transform="rotate(45 20.4727 0.472656)"
        fill={svgColor}
      />
      <Path
        d="M15.6835 6.67601C16.074 6.28548 16.7072 6.28548 17.0977 6.67601L20.3491 9.92742C20.7397 10.3179 20.7397 10.9511 20.3491 11.3416L11.92 19.7708C11.8024 19.8884 11.6573 19.9748 11.4978 20.0222L11.7827 20.9808L11.4978 20.0222L6.87141 21.3972C6.11024 21.6234 5.40174 20.9149 5.62796 20.1537L7.00294 15.5274C7.05033 15.3679 7.13676 15.2228 7.25439 15.1051L15.6835 6.67601Z"
        stroke={svgColor}
        strokeWidth="2"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  PenIcon: {
    width: 27,
    height: 27,
  },
});

export default PenIcon;
