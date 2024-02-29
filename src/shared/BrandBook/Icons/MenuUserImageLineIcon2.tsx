import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../../core/themes/themeContext';

const MenuUserImageLineIcon2 = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg
      style={[styles.MenuUserImageLineIcon2, style]}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 102 142"
      fill="none"
    >
      <Path
        d="M101 1H41C18.9086 1 1 18.9086 1 41V101C1 123.091 18.9086 141 41 141H71.1873"
        stroke={svgColor}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  MenuUserImageLineIcon2: {
    width: 102,
    height: 142,
  },
});

export default MenuUserImageLineIcon2;
