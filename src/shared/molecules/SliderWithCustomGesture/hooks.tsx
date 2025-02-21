import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue, withSpring } from 'react-native-reanimated';

import { SwipeButtonModes } from '../SwipeButton/types';
import { type RightToLeftGestureType } from './types';

export const useCreateRightToLeftGesture = ({
  translateX,
  lastTranslateX,
  isAtMiddle,
  innerSliderWidth,
  buttonWidth,
  mode,
  onSwipeEnd,
  onSwipeStart,
}: RightToLeftGestureType) => {
  const startX = useSharedValue(0);
  const minSwipe = -(innerSliderWidth - buttonWidth);
  const midSwipe = minSwipe / 3;

  const springConfig = {
    damping: 20,
    stiffness: 90,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  };

  return Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])

    .onStart(() => {
      if (onSwipeStart) {
        runOnJS(onSwipeStart)();
      }
      startX.value = lastTranslateX.value;
    })
    .onUpdate(event => {
      if (mode === SwipeButtonModes.Disabled) {
        return;
      }

      const newTranslation = isAtMiddle.value ? midSwipe + event.translationX : startX.value + event.translationX;

      translateX.value = withSpring(Math.max(Math.min(newTranslation, 0), minSwipe), {
        ...springConfig,
        velocity: event.velocityX,
      });
      lastTranslateX.value = translateX.value;
    })
    .onEnd(() => {
      if (translateX.value <= minSwipe) {
        // Full swipe completed
        isAtMiddle.value = false;
        lastTranslateX.value = translateX.value;
        runOnJS(onSwipeEnd)();
      } else if (translateX.value <= midSwipe) {
        // Swipe to middle position
        translateX.value = withSpring(midSwipe);
        isAtMiddle.value = true;
        lastTranslateX.value = midSwipe;
      } else {
        // Return to start
        translateX.value = withSpring(0);
        isAtMiddle.value = false;
        lastTranslateX.value = 0;
      }
    });
};
