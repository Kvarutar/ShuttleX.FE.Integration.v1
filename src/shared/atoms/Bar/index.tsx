import { Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import { BarModes, type BarPressableProps, type BarPropertiesType, type BarProps } from './types';

const Bar = ({
  children,
  style,
  mode = BarModes.Active,
  ...pressableProps
}: BarProps & BarPressableProps): JSX.Element => {
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
      backgroundColor: 'transparent',
    },
    disabled: {
      strokeProps: {
        borderColor: 'transparent',
        borderWidth: 1,
      },
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

  return (
    <Pressable style={[styles.bar, computedStyles.bar, style]} {...pressableProps}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bar: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default Bar;
