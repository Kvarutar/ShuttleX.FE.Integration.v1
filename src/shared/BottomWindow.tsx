import { type ReactNode } from 'react';
import React, { StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../core/themes/shadows';
import sizes from '../core/themes/sizes';
import { useTheme } from '../core/themes/themeContext';

const BottomWindow = ({ children }: { children: ReactNode }): JSX.Element => {
  const { colors } = useTheme();
  const { backgroundPrimaryColor, weakShadowColor } = colors;
  const shadowProps = defaultShadow(weakShadowColor);

  const computedStyles = StyleSheet.create({
    bottomWindow: {
      backgroundColor: backgroundPrimaryColor,
    },
  });

  return (
    <View style={styles.container}>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default BottomWindow;
