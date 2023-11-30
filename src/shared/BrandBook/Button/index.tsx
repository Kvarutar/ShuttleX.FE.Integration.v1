import React from 'react';
import { StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../core/themes/shadows';
import { useTheme } from '../../../core/themes/themeContext';
import Text from '../Text';
import { ButtonModes, type ButtonProps, ButtonShadows } from './props';

const Button = ({
  mode = ButtonModes.Mode1,
  text,
  textStyle,
  style,
  borderRadius = 28,
  shadow,
  disableShadow,
  disableRipple,
  disabled,
  children,
  onPress,
}: ButtonProps): JSX.Element => {
  const { colors } = useTheme();

  const { backgroundColor, textColor, rippleColor, shadowColor } = colors.buttonModes[mode];
  let shadowProps = shadowColor ? defaultShadow(shadowColor) : { disabled: true };

  switch (shadow) {
    case ButtonShadows.Weak:
      shadowProps = defaultShadow(colors.weakShadowColor);
      break;
    case ButtonShadows.Strong:
      shadowProps = defaultShadow(colors.strongShadowColor);
      break;
  }

  if (disableShadow) {
    shadowProps = { disabled: true };
  }

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor,
      borderRadius,
    },
    text: { color: textColor },
  });

  return (
    <Shadow stretch {...shadowProps}>
      <Ripple
        style={[styles.container, computedStyles.container, style]}
        rippleColor={rippleColor ?? textColor}
        rippleContainerBorderRadius={borderRadius}
        rippleDuration={disableRipple ? 0 : 400}
        disabled={disabled}
        onPress={onPress}
      >
        {children ? children : <Text style={[styles.text, computedStyles.text, textStyle]}>{text}</Text>}
      </Ripple>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Inter Medium',
  },
});

export default Button;
