import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { buttonShadow, DISABLED_SHADOW_COLOR } from '../../../core/themes/shadows';
import { useTheme } from '../../../core/themes/themeContext';
import Text from '../Text';
import { ButtonModes, type ButtonProps, ButtonShadows } from './props';

const Button = ({
  mode = ButtonModes.Mode1,
  text,
  textStyle,
  style,
  buttonStyle,
  shadow,
  disableShadow,
  disabled,
  children,
  onPress,
}: ButtonProps): JSX.Element => {
  const { colors } = useTheme();

  const [isPressed, setIsPressed] = useState(false);

  const { backgroundColor, backgroundColorOnPress, textColor, shadowColor } = colors.buttonModes[mode];
  let shadowProps = shadowColor ? buttonShadow(shadowColor) : { startColor: DISABLED_SHADOW_COLOR };

  switch (shadow) {
    case ButtonShadows.Weak:
      shadowProps = buttonShadow(colors.weakShadowColor);
      break;
    case ButtonShadows.Strong:
      shadowProps = buttonShadow(colors.strongShadowColor);
      break;
  }

  if (disableShadow || (isPressed && mode === ButtonModes.Mode2)) {
    shadowProps = { startColor: DISABLED_SHADOW_COLOR };
  }

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: isPressed ? backgroundColorOnPress : backgroundColor,
      height: children ? undefined : 48,
    },
    text: { color: textColor },
  });

  return (
    <View style={style}>
      <Shadow stretch {...shadowProps}>
        <Pressable
          style={[styles.container, computedStyles.container, buttonStyle]}
          disabled={disabled}
          onPress={onPress}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          {children ? children : <Text style={[styles.text, computedStyles.text, textStyle]}>{text}</Text>}
        </Pressable>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Inter Medium',
  },
});

export default Button;
