import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { useTheme } from '../../../core/themes/v2/themeContext';
import SpinnerIcon from '../../icons/SpinnerIcon';
import { type CustomLoadingSpinnerIconSize, LoadingSpinnerIconModes, type LoadingSpinnerProps } from './types';

const iconSizes: Record<LoadingSpinnerIconModes, CustomLoadingSpinnerIconSize> = {
  large: { size: 78, strokeWidth: 7 },
  default: { size: 50, strokeWidth: 5 },
  mini: { size: 34, strokeWidth: 4 },
};

const LoadingSpinner = ({
  iconMode = LoadingSpinnerIconModes.Default,
  startColor,
  endColor,
  style,
}: LoadingSpinnerProps) => {
  const { colors } = useTheme();

  const startColorHandle = startColor ?? colors.backgroundSecondaryColor;
  const endColorHandle = endColor ?? colors.iconSecondaryColor;
  const { size: iconSize, strokeWidth: iconStrokeWidth } =
    typeof iconMode === 'string' ? iconSizes[iconMode] : iconMode;
  const spinnerRotation = useSharedValue(0);
  const duration = 3000;

  useEffect(() => {
    spinnerRotation.value = withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1);
  }, [spinnerRotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinnerRotation.value * 360}deg` }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <SpinnerIcon
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        startColor={startColorHandle}
        endColor={endColorHandle}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingSpinner;
