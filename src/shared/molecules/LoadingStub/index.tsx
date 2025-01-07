import { StyleSheet } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';
import { LoadingBrandIcon, LoadingBrandIconModes, useTheme } from 'shuttlex-integration';

const LoadingStub = ({ mode }: { mode: LoadingBrandIconModes }) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    wrapper: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });

  return (
    <Animated.View
      style={[styles.wrapper, computedStyles.wrapper, StyleSheet.absoluteFill]}
      exiting={FadeOut.duration(200)}
    >
      <LoadingBrandIcon mode={mode} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 20,
  },
});

export default LoadingStub;
