import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Dimensions, type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';
import Blur from '../../atoms/Blur';
import Separator from '../../atoms/Separator';
import BottomWindow from '../BottomWindow';
import ScrollViewWithCustomScroll from '../ScrollViewWithCustomScroll';
import { type BottomWindowWithGestureProps, type BottomWindowWithGestureRef } from './props';

const { height } = Dimensions.get('window');
const duration = 300;
const dampingRatio = 0.9;

const BottomWindowWithGesture = forwardRef<BottomWindowWithGestureRef, BottomWindowWithGestureProps>(
  (
    {
      visiblePart,
      hiddenPart,
      style,
      visiblePartStyles,
      hiddenPartStyles,
      setIsOpened,
      hiddenPartContainerStyles,
      hiddenPartButton,
    },
    ref,
  ) => {
    const [hiddenPartHeight, setHiddenPartHeight] = useState<number>(-height);
    const [visiblePartHeight, setVisiblePartHeight] = useState<number>(0);

    const [isBlur, setIsBlur] = useState<boolean>(false);

    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });

    const { colors } = useTheme();

    useImperativeHandle(ref, () => ({
      closeWindow: () => {
        runOnJS(onWindowStateChange)({ isOpened: false, isCurrentBlur: false });
        setTimeout(() => (translateY.value = withTiming(0, { duration })), 200);
      },
    }));

    const onWindowStateChange = useCallback(
      ({ isOpened, isCurrentBlur }: { isOpened: boolean; isCurrentBlur: boolean }) => {
        setIsBlur(isCurrentBlur);
        if (setIsOpened) {
          setTimeout(() => {
            setIsOpened(isOpened);
          }, 300);
        }
      },
      [setIsOpened],
    );

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        if (translateY.value < 0) {
          translateY.value = Math.max(translateY.value, -hiddenPartHeight);
        } else {
          translateY.value = 0;
        }
      })
      .onEnd(() => {
        if (translateY.value < -hiddenPartHeight / 2) {
          translateY.value = withSpring(-hiddenPartHeight, { duration, dampingRatio });
          runOnJS(onWindowStateChange)({ isOpened: true, isCurrentBlur: true });
        } else if (translateY.value > -hiddenPartHeight / 1.5) {
          translateY.value = withSpring(0, { duration, dampingRatio });
          runOnJS(onWindowStateChange)({ isOpened: false, isCurrentBlur: false });
        }
      });

    const bottomWindowAnimatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

    const computedStyles = StyleSheet.create({
      animatedWrapper: {
        bottom: -hiddenPartHeight,
      },
      bottom: {
        height: height * 0.8,
      },
      draggableElement: {
        backgroundColor: colors.textSecondaryColor,
      },
      separator: {
        borderColor: colors.strokeColor,
      },
    });

    const onHiddenPartLayout = (e: LayoutChangeEvent) => {
      const changedHeight = e.nativeEvent.layout.height;
      setHiddenPartHeight(changedHeight);
    };

    const onVisiblePartLayout = (e: LayoutChangeEvent) => {
      const newHeight = e.nativeEvent.layout.height;
      if (newHeight > visiblePartHeight && visiblePartHeight !== 0) {
        translateY.value = withTiming(translateY.value + (newHeight - visiblePartHeight), { duration: 200 });
      }
      setVisiblePartHeight(e.nativeEvent.layout.height);
    };

    return (
      <>
        {isBlur && <Blur />}
        <Animated.View
          style={[styles.animatedWrapper, computedStyles.animatedWrapper, bottomWindowAnimatedStyle, style]}
          exiting={FadeOut}
          entering={FadeIn}
          layout={LinearTransition}
        >
          <BottomWindow style={styles.bottom} windowStyle={[styles.window, computedStyles.bottom]}>
            <GestureDetector gesture={gesture}>
              <Animated.View layout={LinearTransition}>
                <View style={styles.draggableZone}>
                  <View style={[styles.draggableElement, computedStyles.draggableElement]} />
                </View>
                <Animated.View
                  layout={LinearTransition}
                  style={[styles.visiblePart, visiblePartStyles]}
                  onLayout={onVisiblePartLayout}
                >
                  {visiblePart}
                </Animated.View>
              </Animated.View>
            </GestureDetector>
            <Animated.View onLayout={onHiddenPartLayout} layout={LinearTransition} style={styles.hiddenWrapper}>
              <Separator style={styles.separator} />
              <ScrollViewWithCustomScroll
                style={hiddenPartStyles}
                barStyle={styles.scrollBar}
                wrapperStyle={styles.scrollViewWrapper}
                contentContainerStyle={hiddenPartContainerStyles}
                visibleBarOffset={10}
              >
                {hiddenPart}
              </ScrollViewWithCustomScroll>
              {hiddenPartButton && (
                <>
                  <Separator style={styles.buttonSeparator} />
                  {hiddenPartButton}
                </>
              )}
            </Animated.View>
          </BottomWindow>
        </Animated.View>
      </>
    );
  },
);

export default BottomWindowWithGesture;

const styles = StyleSheet.create({
  bottom: {
    position: 'relative',
  },
  animatedWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  draggableZone: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 10,
    zIndex: 2,
    alignItems: 'center',
  },
  draggableElement: {
    width: 33,
    height: 2,
    borderRadius: 5,
  },
  window: {
    paddingVertical: 0,
  },
  visiblePart: {
    marginTop: sizes.paddingVertical,
    paddingBottom: sizes.paddingVertical,
  },
  scrollBar: {
    right: -10,
  },
  separator: {
    marginBottom: 30,
  },
  buttonSeparator: {
    marginVertical: 20,
  },
  hiddenWrapper: {
    paddingBottom: sizes.paddingVertical,
    flexShrink: 1,
  },
  scrollViewWrapper: {
    flex: 0,
    flexShrink: 1,
  },
});
