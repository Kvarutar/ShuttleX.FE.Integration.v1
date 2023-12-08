import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

import sizes from '../../core/themes/sizes';
import BottomWindow from '../BottomWindow';
import CloseIcon from '../BrandBook/Icons/CloseIcon';
import RoundButton from '../RoundButton';
import { type PopupProps } from './props';

const animationDuration = {
  closeButtonDuration: 300,
  bottomWindowDuration: 500,
};

const Popup = ({ onCloseButtonPress, children, withCloseButton }: PopupProps) => {
  return (
    <View style={styles.bottom}>
      {withCloseButton && (
        <Animated.View
          entering={FadeIn.duration(animationDuration.closeButtonDuration)}
          exiting={FadeOut.duration(animationDuration.closeButtonDuration)}
        >
          <RoundButton style={styles.close} onPress={onCloseButtonPress}>
            <CloseIcon />
          </RoundButton>
        </Animated.View>
      )}
      <Animated.View
        entering={SlideInDown.duration(animationDuration.bottomWindowDuration)}
        exiting={SlideOutDown.duration(animationDuration.bottomWindowDuration)}
      >
        <BottomWindow>{children}</BottomWindow>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  close: {
    alignSelf: 'flex-end',
    marginBottom: 26,
    marginRight: sizes.paddingHorizontal,
  },
});

export default Popup;
