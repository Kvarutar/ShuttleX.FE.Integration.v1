import React from 'react';
import { StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Slider from 'react-native-slide-to-unlock';

import { defaultShadow } from '../../../core/themes/shadows';
import { useTheme } from '../../../core/themes/themeContext';
import Button from '../../BrandBook/Button';
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
      marginLeft: 62,
    },
    slider: {
      backgroundColor: backgroundPrimaryColor,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 28,
    },
  });

  return (
    <Shadow stretch {...shadowProps}>
      <Slider
        onEndReached={() => onSwipeEnd()}
        containerStyle={computedStyles.slider}
        sliderElement={
          <Button
            style={styles.button}
            children={<ArrowIcon />}
            mode={mode === SwipeButtonModes.Confirm ? 'mode1' : 'mode3'}
          />
        }
      >
        <Text style={computedStyles.text}>{text}</Text>
      </Slider>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 38,
  },
});

export default SwipeButton;
