import { StyleSheet, View, type ViewStyle } from 'react-native';
import { Shadow, type ShadowProps } from 'react-native-shadow-2';

import { defaultShadow } from '../../../../core/themes/shadows';
import { useThemeV1 } from '../../../../core/themes/v1/themeContext';
import { BarModes, type BarProps } from '../types';

type BarStylesType = {
  shadowProps: ShadowProps;
  strokeProps: ViewStyle;
  backgroundColor: string;
};
type BarPropertiesType = Record<BarModes, BarStylesType>;

const BarV1 = ({ children, style, mode = BarModes.Active, disableShadow = false }: BarProps): JSX.Element => {
  const { colors, themeMode } = useThemeV1();
  const { backgroundPrimaryColor, backgroundSecondaryColor, strongShadowColor, strokeColor, borderColor } = colors;

  const barProperties: BarPropertiesType = {
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
