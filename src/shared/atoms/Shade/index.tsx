import { Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type ShadeProps } from './props';

const animationDuration = 500;
//TODO: think of clever way to do this animation
const Shade = ({ style }: ShadeProps) => {
  const insets = useSafeAreaInsets();

  const computedStyles = StyleSheet.create({
    darkBackground: {
      marginTop: -insets.top,
    },
  });

  return (
    <Animated.View
      style={StyleSheet.absoluteFill}
      entering={FadeIn.duration(animationDuration)}
      exiting={Platform.OS === 'ios' ? FadeOut.duration(animationDuration) : undefined}
    >
      <View style={[computedStyles.darkBackground, styles.darkBackground, style]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  darkBackground: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.4,
  },
});

export default Shade;
