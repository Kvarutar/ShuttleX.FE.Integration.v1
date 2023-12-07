import { BlurView } from '@react-native-community/blur';
import React, { type PropsWithChildren } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type FadeInViewProps = PropsWithChildren<{
  style?: ViewStyle;
}>;

const Blur: React.FC<FadeInViewProps> = () => (
  <Animated.View style={StyleSheet.absoluteFill} entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)}>
    <BlurView
      blurType="light"
      blurAmount={7}
      reducedTransparencyFallbackColor="white"
      style={StyleSheet.absoluteFill}
    />
  </Animated.View>
);

export default Blur;
