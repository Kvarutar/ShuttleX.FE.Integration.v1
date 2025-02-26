import { forwardRef, type ReactNode, useImperativeHandle, useRef, useState } from 'react';
import { Pressable, type StyleProp, StyleSheet, type TextStyle, View, type ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { buttonShadow, DISABLED_SHADOW_COLOR } from '../../../../core/themes/shadows';
import { type PaletteButtonMode } from '../../../../core/themes/v2/palettes/paletteTypes';
import { useTheme } from '../../../../core/themes/v2/themeContext';
import LoadingSpinner from '../../../molecules/LoadingSpinner';
import { LoadingSpinnerIconModes } from '../../../molecules/LoadingSpinner/types';
import Blur from '../../Blur';
import Text from '../../Text';
import ButtonAnimation from './ButtonAnimation';
import {
  type ButtonAnimationRef,
  type ButtonProps,
  type ButtonRef,
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

const withCircleModeBorderPadding = 4;

const Button = forwardRef<ButtonRef, ButtonProps>(
  (
    {
      mode = SquareButtonModes.Mode1,
      shape = ButtonShapes.Square,
      size = mode === CircleButtonModes.Mode2 ? ButtonSizes.S : ButtonSizes.M,
      withBorder = true,
      withBackgroundColorOnPress = true,
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
      circleMode6Time,
      innerSpacing,
      withCircleModeBorder = false,
      isLoading = false,
      loadingSpinnerSize,
    },
    ref,
  ): JSX.Element => {
    const { colors } = useTheme();
    const buttonAnimationRef = useRef<ButtonAnimationRef>(null);

    const [isPressed, setIsPressed] = useState(false);
    const [isAnimationEnded, setIsAnimationEnded] = useState(false);
    const isMode6 = mode === CircleButtonModes.Mode6;

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

    const mode6BackgroundColor = isMode6 && isAnimationEnded ? 'black' : backgroundColor;
    const isButtonDisabled = isMode6 ? !isAnimationEnded : disabled;
    //for proper work you have to put in the button disabled=false

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

    const loadingSizes: Record<ButtonSizes, LoadingSpinnerIconModes> = {
      s: LoadingSpinnerIconModes.Mini,
      m: LoadingSpinnerIconModes.Default,
      l: LoadingSpinnerIconModes.Large,
    };

    const computedStyles: Record<ButtonShapes, ButtonStyle> = {
      square: {
        button: {
          height: 52,
          backgroundColor: withBackgroundColorOnPress && isPressed ? backgroundColorOnPress : backgroundColor,
          paddingHorizontal: 24,
          borderRadius: 12,
        },
        text: { color: textColor },
      },
      circle: {
        button: {
          height: size ? circleButtonSizes[size] : circleButtonSizes.m,
          width: size ? circleButtonSizes[size] : circleButtonSizes.m,
          paddingHorizontal: 0,
          borderRadius: 1000,
          backgroundColor: withBackgroundColorOnPress && isPressed ? backgroundColorOnPress : mode6BackgroundColor,
          padding: innerSpacing,
        },
        text: { color: isMode6 && isAnimationEnded ? colors.textTertiaryColor : textColor },
      },
    };

    const renderedChildren = children ? (
      children
    ) : (
      <Text style={[styles.text, computedStyles[shape].text, textStyle]}>{text}</Text>
    );

    const handleAnimationEnd = () => {
      setIsAnimationEnded(true);
    };

    useImperativeHandle(ref, () => ({
      restartMode6Animation: () => {
        buttonAnimationRef.current?.restartAnimation();
        setIsAnimationEnded(false);
      },
    }));

    const borderWidth = withBorder ? 1 : 0;
    const withCircleModeBorderContainer = (localChildren: ReactNode) => {
      if (withCircleModeBorder) {
        const localStyle: ViewStyle = {
          padding: withCircleModeBorderPadding,
          backgroundColor: colors.backgroundPrimaryColor,
          borderRadius: 1000,
        };
        return <View style={localStyle}>{localChildren}</View>;
      }
      return localChildren;
    };

    const renderedChildrenWithLoading = (loadingMode: LoadingSpinnerIconModes) =>
      isLoading ? (
        <LoadingSpinner iconMode={loadingSpinnerSize ? loadingSpinnerSize : loadingMode} startColor={backgroundColor} />
      ) : (
        renderedChildren
      );

    const containers = {
      circle:
        mode === CircleButtonModes.Mode6 ? (
          <ButtonAnimation ref={buttonAnimationRef} time={circleMode6Time || 30000} onAnimationEnd={handleAnimationEnd}>
            {renderedChildrenWithLoading(loadingSizes[size])}
          </ButtonAnimation>
        ) : (
          <View
            style={[
              styles.subContainerCircleButton,
              {
                height:
                  innerSpacing && size
                    ? circleButtonSizes[size] - innerSpacing
                    : (size && circleButtonSizes[size]) || 48,
                width:
                  innerSpacing && size
                    ? circleButtonSizes[size] - innerSpacing
                    : (size && circleButtonSizes[size]) || 48,
                borderColor: borderColor,
                backgroundColor: withBackgroundColorOnPress && isPressed ? backgroundColorOnPress : backgroundColor,
                borderWidth: borderWidth,
              },
              circleSubContainerStyle,
            ]}
          >
            {renderedChildrenWithLoading(loadingSizes[size])}
          </View>
        ),
      square:
        mode === SquareButtonModes.Mode3 ? (
          <>
            <Blur />
            {renderedChildrenWithLoading(LoadingSpinnerIconModes.Mini)}
          </>
        ) : (
          renderedChildrenWithLoading(LoadingSpinnerIconModes.Mini)
        ),
    };

    return (
      <View style={containerStyle}>
        {shadow && shape === ButtonShapes.Circle ? (
          <Shadow stretch {...shadowProps}>
            {withCircleModeBorderContainer(
              <Pressable
                hitSlop={withCircleModeBorderPadding}
                style={[styles.button, computedStyles[shape].button, style]}
                disabled={isButtonDisabled || isLoading}
                onPress={onPress}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
              >
                {containers[shape]}
              </Pressable>,
            )}
          </Shadow>
        ) : (
          <Shadow stretch {...shadowProps}>
            <Pressable
              style={[styles.button, computedStyles[shape].button, style]}
              disabled={isButtonDisabled || isLoading}
              onPress={onPress}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              {containers[shape]}
            </Pressable>
          </Shadow>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  subContainerCircleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'Inter Bold',
  },
});

export default Button;
