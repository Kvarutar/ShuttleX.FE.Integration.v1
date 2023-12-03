import React from 'react';
import { StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Slider from 'react-native-slide-to-unlock';

import { defaultShadow } from '../../../core/themes/shadows';
import { useTheme } from '../../../core/themes/themeContext';
import Button from '../../BrandBook/Button';
import { ButtonModes } from '../../BrandBook/Button/props';
import ArrowIcon from '../../BrandBook/Icons/ArrowIcon';
import Text from '../../BrandBook/Text';
import { SwipeButtonModes, type SwipeButtonProps } from './props';

const SwipeButton = ({ onSwipeEnd, mode, text = 'Slide to confirm' }: SwipeButtonProps): JSX.Element => {
  const { colors } = useTheme();
  const { weakShadowColor, backgroundPrimaryColor, textSecondaryColor } = colors;
  const shadowProps = defaultShadow(weakShadowColor);

  const computedStyles = StyleSheet.create({
    text: {
      color: textSecondaryColor,
    },
    slider: {
      backgroundColor: backgroundPrimaryColor,
    },
  });

  const sliderStyles = { ...computedStyles.slider, ...styles.slider };

  return (
    <Shadow stretch {...shadowProps}>
      <Slider
        onEndReached={() => onSwipeEnd()}
        containerStyle={sliderStyles}
        sliderElement={
          <Button
            buttonStyle={styles.button}
            children={<ArrowIcon />}
            mode={mode === SwipeButtonModes.Confirm ? ButtonModes.Mode1 : ButtonModes.Mode3}
          />
        }
      >
        <Text style={[computedStyles.text, styles.text]}>{text}</Text>
      </Slider>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 38,
  },
  text: {
    marginLeft: 62,
  },
  slider: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
});

export default SwipeButton;
