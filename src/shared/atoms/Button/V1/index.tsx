import { useState } from 'react';
import { Pressable, type StyleProp, StyleSheet, type TextStyle, View, type ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { buttonShadow, DISABLED_SHADOW_COLOR } from '../../../../core/themes/shadows';
import { useTheme } from '../../../../core/themes/themeContext';
import Text from '../../Text';
import { ButtonV1Modes, type ButtonV1Props, ButtonV1Shadows, ButtonV1Shapes } from './props';

type ButtonStyle = {
  button: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
};

type ComputedStylesProperties = {
  square: ButtonStyle;
  circle: ButtonStyle;
};

const Button = ({
  mode = ButtonV1Modes.Mode1,
  shape = ButtonV1Shapes.Square,
  text,
  textStyle,
  style,
  containerStyle,
  shadow,
  disableShadow,
  disabled,
  children,
  onPress,
  innerSpacing,
}: ButtonV1Props): JSX.Element => {
  const { colors } = useTheme();

  const [isPressed, setIsPressed] = useState(false);

  const { backgroundColor, backgroundColorOnPress, textColor, shadowColor } = colors.buttonModes[mode];
  const { borderColor } = colors;
  let shadowProps = shadowColor ? buttonShadow(shadowColor) : { startColor: DISABLED_SHADOW_COLOR };

  switch (shadow) {
    case ButtonV1Shadows.Weak:
      shadowProps = buttonShadow(colors.weakShadowColor);
      break;
    case ButtonV1Shadows.Strong:
      shadowProps = buttonShadow(colors.strongShadowColor);
      break;
  }

  if (disableShadow || (isPressed && mode === ButtonV1Modes.Mode2)) {
    shadowProps = { startColor: DISABLED_SHADOW_COLOR };
  }

  const styleHeight = (StyleSheet.flatten(containerStyle)?.height as number) || undefined;

  const computedStylesCircleShape: ButtonStyle = StyleSheet.create({
    button: {
      height: styleHeight,
      width: styleHeight,
      paddingHorizontal: 0,
      borderRadius: 1000,
      backgroundColor: isPressed ? backgroundColorOnPress : backgroundColor,
      padding: innerSpacing,
    },
    text: { color: textColor },
  });

  const computedStylesSquareShape: ButtonStyle = StyleSheet.create({
    button: {
      height: styleHeight || 48,
      backgroundColor: isPressed ? backgroundColorOnPress : backgroundColor,
      paddingHorizontal: 24,
      borderRadius: 16,
    },
    text: { color: textColor },
  });

  const computedStyles: ComputedStylesProperties = {
    square: computedStylesSquareShape,
    circle: computedStylesCircleShape,
  };

  const renderedChildren = children ? (
    children
  ) : (
    <Text style={[styles.text, computedStyles[shape].text, textStyle]}>{text}</Text>
  );

  const containers = {
    circle: (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: innerSpacing && styleHeight ? styleHeight - innerSpacing : styleHeight || 48,
          width: innerSpacing && styleHeight ? styleHeight - innerSpacing : styleHeight || 48,
          borderColor: borderColor,
          borderRadius: 1000,
          borderWidth: 1,
          backgroundColor: isPressed ? backgroundColorOnPress : backgroundColor,
        }}
      >
        {renderedChildren}
      </View>
    ),
    square: renderedChildren,
  };

  return (
    <View style={containerStyle}>
      <Shadow stretch {...shadowProps}>
        <Pressable
          style={[styles.button, computedStyles[shape].button, style]}
          disabled={disabled}
          onPress={onPress}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          {containers[shape]}
        </Pressable>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
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
