import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import SpinnerIcon from '../../BrandBook/Icons/SpinnerIcon';
import Text from '../../BrandBook/Text';
import RoundButton from '../../RoundButton';
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

const calculateTime = (difference: number) => {
  const seconds = Math.floor(Math.abs(difference / 1000) % 60);
  const minutes = Math.floor(Math.abs(difference / 1000 / 60) % 60) + '';

  return {
    seconds: seconds < 10 ? '0' + seconds : seconds + '',
    minutes,
  };
};

const Timer = ({ initialDate = new Date(), onAfterCountdownEnds, style, startColor, endColor, mode }: TimerProps) => {
  const [remainingMinutes, setRemainingMinutes] = useState<string>('0');
  const [remainingSeconds, setRemainingSeconds] = useState<string>('0');

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

  useEffect(() => {
    const difference = initialDate.getTime() - new Date().getTime();
    const { seconds, minutes } = calculateTime(difference);
    setRemainingSeconds(seconds);
    setRemainingMinutes(minutes);
  }, [initialDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = initialDate.getTime() - new Date().getTime();

      const { seconds, minutes } = calculateTime(difference);
      setRemainingSeconds(seconds);
      setRemainingMinutes(minutes);

      if (onAfterCountdownEnds && difference < 250) {
        onAfterCountdownEnds();
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [remainingMinutes, remainingSeconds, onAfterCountdownEnds, initialDate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 360}deg` }],
  }));

  return (
    <RoundButton roundButtonStyle={[styles.timerWrapper, computedStyles.timerWrapper]} style={style}>
      <Animated.View style={[animatedStyle]}>
        <SpinnerIcon size={iconSize} strokeWidth={iconStrokeWidth} startColor={startColor} endColor={endColor} />
      </Animated.View>
      <View style={[StyleSheet.absoluteFill, styles.timerTextWrapper]}>
        <Text style={computedStyles.timerText}>
          {remainingMinutes}:{remainingSeconds}
        </Text>
      </View>
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
