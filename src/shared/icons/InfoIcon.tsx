import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const InfoIcon = ({
  style,
  color,
  backgroundColor,
}: {
  style?: StyleProp<ViewStyle>;
  color?: string;
  backgroundColor?: string;
}): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;
  const svgBackgroundColor = backgroundColor ?? colors.backgroundSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect width="18" height="18" rx="9" fill={svgBackgroundColor} />
      <Path d="M9 13V9" stroke={svgColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.99988 5H9.00988" stroke={svgColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
});

export default InfoIcon;
