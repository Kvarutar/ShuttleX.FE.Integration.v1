import { useState } from 'react';
import { Pressable, type StyleProp, StyleSheet, type TextStyle, View, type ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { buttonShadow, DISABLED_SHADOW_COLOR } from '../../../../core/themes/shadows';
import { type PaletteButtonMode } from '../../../../core/themes/v2/palettes/paletteTypes';
import { useTheme } from '../../../../core/themes/v2/themeContext';
import Blur from '../../Blur';
import Text from '../../Text';
import {
  type ButtonProps,
  ButtonShadows,
  ButtonShapes,
  ButtonSizes,
  CircleButtonModes,
  SquareButtonModes,
} from './props';

type ButtonStyle = {
  button: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
};

const Button = ({
  mode = SquareButtonModes.Mode1,
  shape = ButtonShapes.Square,
  size = ButtonSizes.M,
  text,
  textStyle,
  style,
  containerStyle,
  circleSubContainerStyle,
  shadow,
  disableShadow,
  disabled,
  children,
  onPress,
  innerSpacing,
}: ButtonProps): JSX.Element => {
  const { colors } = useTheme();

  const [isPressed, setIsPressed] = useState(false);

  let buttonColors: PaletteButtonMode;
  switch (shape) {
    case ButtonShapes.Circle:
      buttonColors = colors.circleButtonModes[mode as CircleButtonModes];
      break;
    case ButtonShapes.Square:
      buttonColors = colors.squareButtonModes[mode as SquareButtonModes];
      break;
  }
  const { backgroundColor, backgroundColorOnPress, textColor, shadowColor } = buttonColors;
  const { borderColor } = colors;
  let shadowProps = shadowColor ? buttonShadow(shadowColor) : { startColor: DISABLED_SHADOW_COLOR };

  if (shadow) {
    switch (shadow) {
      case ButtonShadows.Weak:
        shadowProps = buttonShadow(colors.weakShadowColor);
        break;
      case ButtonShadows.Strong:
        shadowProps = buttonShadow(colors.strongShadowColor);
        break;
    }
  }

  if (disableShadow) {
    shadowProps = { startColor: DISABLED_SHADOW_COLOR };
  }

  const circleButtonSizes: Record<ButtonSizes, number> = {
    s: 44,
    m: 60,
    l: 92,
  };

  const computedStyles: Record<ButtonShapes, ButtonStyle> = {
    square: {
      button: {
        height: 52,
        backgroundColor: isPressed ? backgroundColorOnPress : backgroundColor,
      },
      text: { color: textColor },
    },
    circle: {
      button: {
        height: size ? circleButtonSizes[size] : circleButtonSizes.m,
        width: size ? circleButtonSizes[size] : circleButtonSizes.m,
        paddingHorizontal: 0,
        borderRadius: 1000,
        backgroundColor: isPressed ? backgroundColorOnPress : backgroundColor,
        padding: innerSpacing,
      },
      text: { color: textColor },
    },
  };

  const renderedChildren = children ? (
    children
  ) : (
    <Text style={[styles.text, computedStyles[shape].text, textStyle]}>{text}</Text>
  );

  const containers = {
    circle: (
      <View
        style={[
          styles.subContainerCircleButton,
          {
            height:
              innerSpacing && size ? circleButtonSizes[size] - innerSpacing : (size && circleButtonSizes[size]) || 48,
            width:
              innerSpacing && size ? circleButtonSizes[size] - innerSpacing : (size && circleButtonSizes[size]) || 48,
            borderColor: borderColor,
            backgroundColor: isPressed ? backgroundColorOnPress : backgroundColor,
          },
          circleSubContainerStyle,
        ]}
      >
        {renderedChildren}
      </View>
    ),
    square:
      mode === SquareButtonModes.Mode3 ? (
        <>
          <Blur />
          {renderedChildren}
        </>
      ) : (
        renderedChildren
      ),
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
  subContainerCircleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    borderWidth: 1,
  },
  button: {
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'Inter Bold',
  },
});

export default Button;
