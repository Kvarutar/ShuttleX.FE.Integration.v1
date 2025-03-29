import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const BarsIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  return (
    <Svg style={[styles.ArrowIcon, style]} viewBox="0 0 16 12" fill="none">
      <Rect width="16" height="2" fill={svgColor} />
      <Rect y="5" width="16" height="2" fill={svgColor} />
      <Rect y="10" width="16" height="2" fill={svgColor} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  ArrowIcon: {
    width: 16,
    height: 12,
  },
});

export default BarsIcon;
