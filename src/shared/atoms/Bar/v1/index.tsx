import { StyleSheet, View, type ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../../core/themes/shadows';
import { useTheme } from '../../../../core/themes/themeContext';
import { BarModes, type BarPropertiesTypeV1, type BarProps } from '../types';

const BarV1 = ({ children, style, mode = BarModes.Active, disableShadow = false }: BarProps): JSX.Element => {
  const { colors, themeMode } = useTheme();
  const { backgroundPrimaryColor, backgroundSecondaryColor, strongShadowColor, strokeColor, borderColor } = colors;

  const barProperties: BarPropertiesTypeV1 = {
    active: {
      shadowProps: defaultShadow(strongShadowColor),
      strokeProps: {},
      backgroundColor: themeMode === 'light' ? backgroundPrimaryColor : backgroundSecondaryColor,
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
    <Shadow disabled={disableShadow} stretch {...shadowProps}>
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

export default BarV1;
