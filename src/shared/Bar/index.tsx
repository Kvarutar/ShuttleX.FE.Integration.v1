import React, { StyleSheet, View, type ViewStyle } from 'react-native';
import { Shadow, type ShadowProps } from 'react-native-shadow-2';

import { defaultShadow } from '../../core/themes/shadows';
import { useTheme } from '../../core/themes/themeContext';
import { BarModes, type BarProps } from './types';

type BarStylesType = {
  shadowProps: ShadowProps;
  strokeProps: ViewStyle;
  backgroundColor: string;
};
type BarPropertiesType = Record<BarModes, BarStylesType>;

const Bar = ({ children, style, mode = BarModes.Active }: BarProps): JSX.Element => {
  const { colors } = useTheme();
  const { backgroundPrimaryColor, strongShadowColor, strokeColor, borderColor } = colors;

  const barProperties: BarPropertiesType = {
    active: {
      shadowProps: defaultShadow(strongShadowColor),
      strokeProps: {},
      backgroundColor: backgroundPrimaryColor,
    },
    default: {
      shadowProps: { disabled: true },
      strokeProps: {
        borderColor: strokeColor,
        borderWidth: 1,
        borderStyle: 'dashed',
      },
      backgroundColor: backgroundPrimaryColor,
    },
    disabled: {
      shadowProps: { disabled: true },
      strokeProps: {},
      backgroundColor: borderColor,
    },
  };

  const strokeProps: ViewStyle = barProperties[mode].strokeProps;

  const { shadowProps, backgroundColor } = barProperties[mode];

  const computedStyles = StyleSheet.create({
    bar: {
      backgroundColor,
      ...strokeProps,
    },
  });

  return (
    <Shadow stretch {...shadowProps}>
      <View style={[styles.bar, computedStyles.bar, style]}>{children}</View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  bar: {
    padding: 20,
    borderRadius: 12,
  },
});

export default Bar;
