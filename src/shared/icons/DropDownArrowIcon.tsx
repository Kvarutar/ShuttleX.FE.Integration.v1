import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

type IconModes = 'filled' | 'default';
type IconStylesOptions = {
  fill: string;
  stroke: string;
  arrow: string;
};
type IconStyles = Record<IconModes, IconStylesOptions>;

const DropDownIcon = ({
  style,
  color,
  mode = 'default',
}: {
  style?: StyleProp<ViewStyle>;
  color?: string;
  mode?: IconModes;
}): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconSecondaryColor;

  const iconModes: IconStyles = {
    default: {
      fill: 'none',
      stroke: svgColor,
      arrow: svgColor,
    },
    filled: {
      fill: colors.iconPrimaryColor,
      stroke: colors.backgroundPrimaryColor,
      arrow: colors.backgroundPrimaryColor,
    },
  };

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      style={[styles.icon, style]}
      fill={iconModes[mode].fill}
      viewBox="0 0 30 30"
    >
      <Circle
        cx={15}
        cy={15}
        r={13.25}
        transform="rotate(-90 15 15)"
        stroke={iconModes[mode].stroke}
        strokeWidth={1.5}
      />
      <Path
        d="M13.7974 10.4687L17.7718 14.6517C18.1337 15.0326 18.1391 15.6286 17.7843 16.016L13.7974 20.3682"
        stroke={iconModes[mode].arrow}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default DropDownIcon;
