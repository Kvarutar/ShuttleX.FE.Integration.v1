import { BlurView } from '@react-native-community/blur';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { type BlurProps } from './props';

//TODO: think of clever way to do this animation
const Blur = ({ style, animationDuration = 500 }: BlurProps) => (
  <Animated.View
    style={StyleSheet.absoluteFill}
    entering={FadeIn.duration(animationDuration)}
    exiting={Platform.OS === 'ios' ? FadeOut.duration(animationDuration) : undefined}
  >
    {Platform.OS === 'ios' ? (
      <BlurView style={[styles.ios, style]} blurType="light" blurAmount={7} reducedTransparencyFallbackColor="white" />
    ) : (
      <View style={[styles.android, style]} />
    )}
  </Animated.View>
);

const styles = StyleSheet.create({
  ios: {
    flex: 1,
  },
  android: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.4,
  },
});

export default Blur;
