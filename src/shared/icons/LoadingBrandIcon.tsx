import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { useTheme } from '../../core/themes/v2/themeContext';
import LoadingBrandIconInside from './LoadingBrandIconInside';
import LoadingBrandIconText from './LoadingBrandIconText';

export enum LoadingBrandIconModes {
  Mode1 = 'mode1',
  Mode2 = 'mode2',
}

type IconOptions = {
  innerColor: string;
  wrapperColor: string;
};

const LoadingBrandIcon = ({ mode = LoadingBrandIconModes.Mode1 }: { mode?: LoadingBrandIconModes }) => {
  const { colors } = useTheme();

  const spin = useSharedValue(0);
  useEffect(() => {
    spin.value = withRepeat(withTiming(360, { duration: 5000, easing: Easing.linear }), -1, false);
  }, [spin]);

  const innerAnimatiedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${spin.value}deg`,
        },
      ],
    };
  });

  const iconOptions: Record<LoadingBrandIconModes, IconOptions> = {
    mode1: {
      innerColor: colors.primaryColor,
      wrapperColor: colors.iconPrimaryColor,
    },
    mode2: {
      innerColor: colors.iconPrimaryColor,
      wrapperColor: colors.primaryColor,
    },
  };

  const { innerColor, wrapperColor } = iconOptions[mode];

  const computedStyles = StyleSheet.create({
    iconWrapper: {
      backgroundColor: wrapperColor,
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={[styles.iconWrapper, computedStyles.iconWrapper]}>
        <Animated.View style={[styles.inner, innerAnimatiedStyle]}>
          <LoadingBrandIconInside color={innerColor} />
        </Animated.View>
      </View>
      <LoadingBrandIconText />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 11,
    justifyContent: 'center',
  },
  inner: {
    alignSelf: 'center',
  },
});

export default LoadingBrandIcon;
