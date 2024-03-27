import React, { useEffect, useState } from 'react';

import Text from '../../../atoms/Text';
import { type CountingComponentProps } from './props';

const calculateTime = (difference: number, isWithoutSeconds: boolean, isWithoutMinutes: boolean) => {
  const seconds = Math.floor(Math.abs(difference / 1000) % 60);
  const minutes = Math.floor(Math.abs(difference / 1000 / 60) % 60);
  const hours = Math.floor(Math.abs(difference / 1000 / 3600) % 24);

  let stringMinutes = minutes.toString();
  let stringHours = hours.toString();

  if (isWithoutSeconds && isWithoutMinutes && minutes !== 0) {
    stringHours = (hours + 1).toString();
  } else if (isWithoutSeconds && seconds !== 0) {
    stringMinutes = (minutes + 1).toString();
  }

  return {
    seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
    minutes: stringMinutes,
    hours: stringHours,
  };
};

const CountingComponent = ({ initialDate, onAfterCountdownEnds, mask, style }: CountingComponentProps) => {
  const [remainingHours, setRemainingHours] = useState<string>('0');
  const [remainingMinutes, setRemainingMinutes] = useState<string>('0');
  const [remainingSeconds, setRemainingSeconds] = useState<string>('0');

  const isWithoutSeconds = !mask.includes('{s}') && onAfterCountdownEnds !== undefined;
  const isWithoutMinutes = !mask.includes('{m}') && onAfterCountdownEnds !== undefined;

  useEffect(() => {
    const difference = initialDate.getTime() - new Date().getTime();
    const { seconds, minutes, hours } = calculateTime(difference, isWithoutSeconds, isWithoutMinutes);

    setRemainingSeconds(seconds);
    setRemainingMinutes(minutes);
    setRemainingHours(hours);
  }, [initialDate, isWithoutSeconds, isWithoutMinutes]);

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = initialDate.getTime() - new Date().getTime();

      const { seconds, minutes, hours } = calculateTime(difference, isWithoutSeconds, isWithoutMinutes);
      setRemainingSeconds(seconds);
      setRemainingMinutes(minutes);
      setRemainingHours(hours);

      if (onAfterCountdownEnds && difference < 250) {
        onAfterCountdownEnds();
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [
    remainingHours,
    remainingMinutes,
    remainingSeconds,
    onAfterCountdownEnds,
    initialDate,
    isWithoutSeconds,
    isWithoutMinutes,
  ]);

  const content = mask
    .replace(/{h}/gi, remainingHours)
    .replace(/{m}/gi, remainingMinutes)
    .replace(/{s}/gi, remainingSeconds);

  return <Text style={style}>{content}</Text>;
};

export default CountingComponent;
