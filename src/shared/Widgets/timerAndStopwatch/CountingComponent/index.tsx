import React, { useEffect, useState } from 'react';

import Text from '../../../BrandBook/Text';
import { type CountingComponentProps } from './props';

const calculateTime = (difference: number) => {
  const seconds = Math.floor(Math.abs(difference / 1000) % 60);
  const minutes = Math.floor(Math.abs(difference / 1000 / 60) % 60) + '';
  const hours = Math.floor(Math.abs(difference / 1000 / 3600) % 24) + '';

  return {
    seconds: seconds < 10 ? '0' + seconds : seconds + '',
    minutes,
    hours,
  };
};

const CountingComponent = ({ initialDate, onAfterCountdownEnds, mask, style }: CountingComponentProps) => {
  const [remainingHours, setRemainingHours] = useState<string>('0');
  const [remainingMinutes, setRemainingMinutes] = useState<string>('0');
  const [remainingSeconds, setRemainingSeconds] = useState<string>('0');

  useEffect(() => {
    const difference = initialDate.getTime() - new Date().getTime();
    const { seconds, minutes, hours } = calculateTime(difference);
    setRemainingSeconds(seconds);
    setRemainingMinutes(minutes);
    setRemainingHours(hours);
  }, [initialDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = initialDate.getTime() - new Date().getTime();

      const { seconds, minutes, hours } = calculateTime(difference);
      setRemainingSeconds(seconds);
      setRemainingMinutes(minutes);
      setRemainingHours(hours);

      if (onAfterCountdownEnds && difference < 250) {
        onAfterCountdownEnds();
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [remainingHours, remainingMinutes, remainingSeconds, onAfterCountdownEnds, initialDate]);

  const content = mask
    .replace(/{h}/gi, remainingHours)
    .replace(/{m}/gi, remainingMinutes)
    .replace(/{s}/gi, remainingSeconds);

  return <Text style={style}>{content}</Text>;
};

export default CountingComponent;
