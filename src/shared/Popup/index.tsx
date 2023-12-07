import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

import sizes from '../../core/themes/sizes';
import BottomWindow from '../BottomWindow';
import CloseIcon from '../BrandBook/Icons/CloseIcon';
import RoundButton from '../RoundButton';
import { type PopupProps } from './props';

const Popup = ({ closePopupHandler, children, withClose }: PopupProps) => {
  return (
    <View style={styles.bottom}>
      {withClose && (
        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
          <RoundButton style={styles.close} onPress={closePopupHandler}>
            <CloseIcon />
          </RoundButton>
        </Animated.View>
      )}
      <Animated.View entering={SlideInDown.duration(500)} exiting={SlideOutDown.duration(500)}>
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
