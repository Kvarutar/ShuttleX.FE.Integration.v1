import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { useTheme } from '../../../core/themes/themeContext';

const FeedbackWheelIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none">
      <Rect width={30} height={30} rx={8} fill={svgColor} />
      <Circle cx={15} cy={15} r={8.25} stroke={colors.backgroundPrimaryColor} strokeWidth={1.5} />
      <Circle cx={15} cy={15} r={2.25} stroke={colors.backgroundPrimaryColor} strokeWidth={1.5} />
      <Path d="M12.5 14.5L7 13" stroke={colors.backgroundPrimaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M17.5 14.5L23 13" stroke={colors.backgroundPrimaryColor} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M15 17.5V23" stroke={colors.backgroundPrimaryColor} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default FeedbackWheelIcon;
