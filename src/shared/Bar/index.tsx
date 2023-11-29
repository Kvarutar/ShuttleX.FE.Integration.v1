import React, { StyleSheet, View, type ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../core/themes/shadows';
import { useTheme } from '../../core/themes/themeContext';
import { type BarProps } from './types';

const Bar = ({ children, style, isActive }: BarProps): JSX.Element => {
  const { colors } = useTheme();
  const { backgroundPrimaryColor, strongShadowColor, strokeColor } = colors;
  let shadowProps = defaultShadow(strongShadowColor);

  let strokeProps: ViewStyle = {};
  if (!isActive) {
    shadowProps = { disabled: true };
    strokeProps = {
      borderColor: strokeColor,
      borderWidth: 1,
      borderStyle: 'dashed',
    };
  }

  const computedStyles = StyleSheet.create({
    bar: {
      backgroundColor: backgroundPrimaryColor,
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
