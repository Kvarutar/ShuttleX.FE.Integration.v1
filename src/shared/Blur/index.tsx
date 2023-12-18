import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { type BlurProps } from './props';

const Blur = ({ children, style, animationDuration = 500 }: BlurProps) => (
  <Animated.View
    style={StyleSheet.absoluteFill}
    entering={FadeIn.duration(animationDuration)}
    exiting={FadeOut.duration(animationDuration)}
  >
    <BlurView
      blurType="light"
      blurAmount={7}
      reducedTransparencyFallbackColor="white"
      style={[StyleSheet.absoluteFill, style]}
    >
      {children}
    </BlurView>
  </Animated.View>
);

export default Blur;
