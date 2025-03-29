import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import sizes from '../../core/themes/sizes';
import { useTheme } from '../../core/themes/themeContext';

const EmergencyServiceIcon = ({ style }: { style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useTheme();

  const svgColor = colors.iconPrimaryColor;

  return (
    <Svg style={[styles.EmergencyServiceIcon, style]} viewBox="0 0 24 24" fill="none">
      <Rect width={24} height={24} fill="white" fillOpacity={0.01} />
      <Path
        d="M18 17.5H6V10.5C6 7.18629 8.68629 4.5 12 4.5C15.3137 4.5 18 7.18629 18 10.5V17.5Z"
        fill="#FF3333"
        stroke={svgColor}
        strokeWidth={2}
      />
      <Path d="M4 21H20" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M2 6.5L3.5 7" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M6.50027 2.00093L7.00027 3.50093" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M4.99957 4.99897L3.49957 3.49897" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M22.4805 6.5L20.9805 7" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M17.9802 2.00093L17.4802 3.50093" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M19.4809 4.99897L20.9809 3.49897" stroke={svgColor} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  EmergencyServiceIcon: {
    width: sizes.iconSize,
    height: sizes.iconSize,
  },
});

export default EmergencyServiceIcon;
