import { StyleSheet, View, type ViewStyle } from 'react-native';

import { useTheme } from '../../../../core/themes/v2/themeContext';
import { BarModes, type BarProps } from '../types';

type BarStylesType = {
  strokeProps: ViewStyle;
  backgroundColor: string;
};
type BarPropertiesType = Record<BarModes, BarStylesType>;

const Bar = ({ children, style, mode = BarModes.Active }: BarProps): JSX.Element => {
  const { colors } = useTheme();
  const { backgroundPrimaryColor, backgroundSecondaryColor, borderColor, borderDashColor } = colors;

  const barProperties: BarPropertiesType = {
    active: {
      strokeProps: {
        borderColor: borderColor,
        borderWidth: 1,
        borderStyle: 'solid',
      },
      backgroundColor: backgroundPrimaryColor,
    },
    default: {
      strokeProps: {
        borderColor: borderDashColor,
        borderWidth: 1,
        borderStyle: 'dashed',
      },
      backgroundColor: backgroundPrimaryColor,
    },
    disabled: {
      strokeProps: {},
      backgroundColor: backgroundSecondaryColor,
    },
  };

  const strokeProps: ViewStyle = barProperties[mode].strokeProps;

  const { backgroundColor } = barProperties[mode];

  const computedStyles = StyleSheet.create({
    bar: {
      backgroundColor,
      ...strokeProps,
    },
  });

  return <View style={[styles.bar, computedStyles.bar, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  bar: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default Bar;
