import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { orientation, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors';

import { radToDeg } from '.';

type ExtendedHeadingValueType = {
  current: number;
  previous: number;
  delta: number;
  heading: number;
  headingExtended: number;
};

const calculateExtendedHeading = (
  args: Pick<ExtendedHeadingValueType, 'current' | 'previous' | 'delta'>,
): ExtendedHeadingValueType | null => {
  const headingValue: {
    current: number;
    previous: number;
    delta: number;
  } = args;

  const diff = headingValue.current - headingValue.previous;

  // If diffrence more than 180 degrees
  if (Math.abs(diff) > 180) {
    headingValue.delta += Math.sign(diff) * -360; // adds or removes 360 from headingValue.delta
  }

  // If diffrence more than 3 degrees
  if (Math.abs(diff) > 3) {
    return {
      heading: headingValue.current < 0 ? headingValue.current + 360 : headingValue.current,
      headingExtended: headingValue.current + headingValue.delta,
      ...headingValue,
    };
  }
  return null;
};

const useCompass = () => {
  const headingRef = useRef({ current: 0, previous: 0, delta: 0 });
  const heading = useSharedValue({ heading: 0, headingExtended: 0 });

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.orientation, 150);

    const subscription = orientation.subscribe(
      orientationData => {
        const extendedHeadingValue = calculateExtendedHeading({
          current: radToDeg(orientationData.yaw),
          previous: headingRef.current.current,
          delta: headingRef.current.delta,
        });

        if (extendedHeadingValue) {
          headingRef.current = extendedHeadingValue;
          let reverseSignForIOS = 1;
          if (Platform.OS === 'ios') {
            reverseSignForIOS = -1;
          }
          heading.value = {
            heading: extendedHeadingValue.heading * reverseSignForIOS,
            headingExtended: extendedHeadingValue.headingExtended * reverseSignForIOS,
          };
        }
      },
      error => {
        console.error('The orientation sensor is not available', error);
      },
    );

    return () => subscription.unsubscribe();
  }, [heading]);

  return { compassSharedValue: heading };
};

export { calculateExtendedHeading, useCompass };
