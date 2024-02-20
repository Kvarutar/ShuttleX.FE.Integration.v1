import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import SpinnerIcon from '../../../BrandBook/Icons/SpinnerIcon';
import RoundButton from '../../../RoundButton';
import CountingComponent from '../CountingComponent';
import { type TimerProps, type TimerSizesType } from './props';

const timerSizes: TimerSizesType = {
  normal: {
    iconSize: 87,
    iconStrokeWidth: 7,
    timerSize: 100,
    fontSize: 18,
  },
  mini: {
    iconSize: 55,
    iconStrokeWidth: 6,
    timerSize: 64,
    fontSize: 12,
  },
};

const Timer = ({
  initialDate = new Date(),
  onAfterCountdownEnds,
  style,
  startColor,
  endColor,
  mode,
  withCountdown = true,
}: TimerProps) => {
  const { iconSize, iconStrokeWidth, timerSize, fontSize } = timerSizes[mode];
  const computedStyles = StyleSheet.create({
    timerWrapper: {
      width: timerSize,
      height: timerSize,
    },
    timerText: {
      fontSize,
    },
  });

  const rotation = useSharedValue(0);
  const duration = 3000;

  useEffect(() => {
    rotation.value = withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1);
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 360}deg` }],
  }));

  return (
    <RoundButton roundButtonStyle={[styles.timerWrapper, computedStyles.timerWrapper]} style={style}>
      <Animated.View style={[animatedStyle]}>
        <SpinnerIcon size={iconSize} strokeWidth={iconStrokeWidth} startColor={startColor} endColor={endColor} />
      </Animated.View>
      {withCountdown && (
        <View style={[StyleSheet.absoluteFill, styles.timerTextWrapper]}>
          <CountingComponent
            initialDate={initialDate}
            onAfterCountdownEnds={onAfterCountdownEnds}
            mask="{m}:{s}"
            style={computedStyles.timerText}
          />
        </View>
      )}
    </RoundButton>
  );
};

const styles = StyleSheet.create({
  timerWrapper: {
    borderRadius: 100,
  },
  timerTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Timer;
