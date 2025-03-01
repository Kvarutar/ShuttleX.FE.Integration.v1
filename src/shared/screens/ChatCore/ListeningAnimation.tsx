import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  type SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../../../core/themes/v2/themeContext';
import { type ListeningAnimationState } from './types';

const numBars = 36;

const AnimatedLine = ({ index, volume }: { index: number; volume: SharedValue<number> }) => {
  const height = useDerivedValue(() => {
    return withTiming((Math.sin(index + volume.value * Math.PI * 2) + 1) * 10, {
      duration: 150,
      easing: Easing.ease,
    });
  }, [volume]);

  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    bar: {
      backgroundColor: colors.textQuadraticColor,
    },
  });

  return <Animated.View style={[styles.bar, computedStyles.bar, { height }]} />;
};

const ListeningAnimation = ({ iconWidth, event }: ListeningAnimationState) => {
  const volume = useSharedValue(0);

  const computedStyles = StyleSheet.create({
    container: {
      left: iconWidth + 10,
      alignSelf: 'center',
    },
  });

  useEffect(() => {
    if (event?.value) {
      volume.value = Math.min(event.value, 1);
    }
  }, [event?.value, volume]);

  return (
    <View style={[styles.container, computedStyles.container]}>
      {Array.from({ length: numBars }).map((_, index) => (
        <AnimatedLine key={index} index={index} volume={volume} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    position: 'absolute',
  },
  bar: {
    width: 2,
    borderRadius: 5,
  },
});

export default ListeningAnimation;
