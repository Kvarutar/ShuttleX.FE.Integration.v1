import { type ReactNode } from 'react';
import React, { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../core/themes/shadows';
import sizes from '../core/themes/sizes';
import { useTheme } from '../core/themes/themeContext';

const BottomWindow = ({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }): JSX.Element => {
  const { colors } = useTheme();
  const { backgroundPrimaryColor, weakShadowColor } = colors;
  const shadowProps = defaultShadow(weakShadowColor);

  const computedStyles = StyleSheet.create({
    bottomWindow: {
      backgroundColor: backgroundPrimaryColor,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Shadow stretch {...shadowProps}>
        <View style={[computedStyles.bottomWindow, styles.bottomWindow]}>{children}</View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomWindow: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: sizes.paddingHorizontal,
    paddingVertical: sizes.paddingVertical,
  },
  container: {
    width: '100%',
  },
});

export default BottomWindow;
