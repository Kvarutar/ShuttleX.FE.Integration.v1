import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { useTheme } from '../../../core/themes/themeContext';

const LowSignalIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.backgroundPrimaryColor;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 10" style={[styles.icon, style]}>
      <Rect y={6} width={3} height={4} rx={1.5} fill={svgColor} />
      <Rect x={4} y={3} width={3} height={7} rx={1.5} fill={svgColor} fillOpacity={0.5} />
      <Rect x={8} width={3} height={10} rx={1.5} fill={svgColor} fillOpacity={0.5} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 11,
    height: 10,
  },
});

export default LowSignalIcon;
