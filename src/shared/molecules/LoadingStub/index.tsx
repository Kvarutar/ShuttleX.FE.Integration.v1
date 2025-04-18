import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';

import { useTheme } from '../../../core/themes/themeContext';
import LoadingBrandIcon from '../../icons/LoadingBrandIcon';
import { type LoadingStubProps } from './types';

const timeoutMilSec = 7000;

const LoadingStub = ({ mode, onTimeout }: LoadingStubProps) => {
  const { colors } = useTheme();

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (onTimeout) {
      timeout = setTimeout(onTimeout, timeoutMilSec);
    }

    return () => clearTimeout(timeout);
  }, [onTimeout]);

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
