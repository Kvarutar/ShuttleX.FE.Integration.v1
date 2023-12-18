import React, { StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../core/themes/shadows';
import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';
import { type BottomWindowProps } from './props';

const BottomWindow = ({ children, style, windowStyle }: BottomWindowProps): JSX.Element => {
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
        <View style={[computedStyles.bottomWindow, styles.bottomWindow, windowStyle]}>{children}</View>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default BottomWindow;
