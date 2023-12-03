import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../core/themes/shadows';
import { useTheme } from '../../core/themes/themeContext';
import { type RoundButtonProps } from './types';

const RoundButton = ({ onPress, style, children }: RoundButtonProps): JSX.Element => {
  const { colors } = useTheme();

  const { backgroundPrimaryColor, strongShadowColor } = colors;
  const shadowProps = defaultShadow(strongShadowColor);

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: backgroundPrimaryColor,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <Shadow stretch {...shadowProps}>
        <View style={[computedStyles.container, styles.container, style]}>{children}</View>
      </Shadow>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoundButton;
