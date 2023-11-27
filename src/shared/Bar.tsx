import { type ReactNode } from 'react';
import React, { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../core/themes/shadows';
import { useTheme } from '../core/themes/themeContext';

const Bar = ({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useTheme();
  const { backgroundPrimaryColor, weakShadowColor } = colors;
  const shadowProps = defaultShadow(weakShadowColor);

  const computedStyles = StyleSheet.create({
    bar: {
      backgroundColor: backgroundPrimaryColor,
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
