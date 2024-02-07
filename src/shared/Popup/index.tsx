import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

import sizes from '../../core/themes/sizes';
import Blur from '../Blur';
import CloseIcon from '../BrandBook/Icons/CloseIcon';
import ShortArrowIcon from '../BrandBook/Icons/ShortArrowIcon';
import RoundButton from '../RoundButton';
import BottomWindow from '../Widgets/BottomWindow';
import { type PopupProps } from './props';

const animationDuration = {
  closeButtonDuration: 300,
  bottomWindowDuration: 500,
};

const Popup = ({
  children,
  style,
  bottomWindowStyle,
  isWithBlur = true,
  onCloseButtonPress,
  onBackButtonPress,
}: PopupProps) => (
  <>
    {isWithBlur && <Blur />}
    {onBackButtonPress && (
      <Animated.View
        entering={FadeIn.duration(animationDuration.closeButtonDuration)}
        exiting={FadeOut.duration(animationDuration.closeButtonDuration)}
        style={styles.backButton}
      >
        <RoundButton onPress={onBackButtonPress}>
          <ShortArrowIcon />
        </RoundButton>
      </Animated.View>
    )}
    <View style={[styles.bottom, style]}>
      {onCloseButtonPress && (
        <Animated.View
          entering={FadeIn.duration(animationDuration.closeButtonDuration)}
          exiting={FadeOut.duration(animationDuration.closeButtonDuration)}
        >
          <RoundButton style={styles.closeButton} onPress={onCloseButtonPress}>
            <CloseIcon />
          </RoundButton>
        </Animated.View>
      )}
      <Animated.View
        entering={SlideInDown.duration(animationDuration.bottomWindowDuration)}
        exiting={SlideOutDown.duration(animationDuration.bottomWindowDuration)}
      >
        <BottomWindow style={styles.bottomWindow} windowStyle={bottomWindowStyle}>
          {children}
        </BottomWindow>
      </Animated.View>
    </View>
  </>
);

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 26,
    marginRight: sizes.paddingHorizontal,
  },
  backButton: {
    position: 'absolute',
    left: sizes.paddingHorizontal,
    top: sizes.paddingVertical,
  },
  bottomWindow: {
    position: 'relative',
  },
});

export default Popup;
