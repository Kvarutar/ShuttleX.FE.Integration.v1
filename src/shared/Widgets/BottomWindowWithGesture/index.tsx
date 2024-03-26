import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Dimensions, type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';
import Blur from '../../Blur';
import Separator from '../../BrandBook/Separator';
import BottomWindow from '../BottomWindow';
import ScrollViewWithCustomScroll from '../ScrollViewWithCustomScroll';
import { type BottomWindowWithGestureProps, type BottomWindowWithGestureRef } from './props';

const { height } = Dimensions.get('window');
const duration = 1200;
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

    const [isBlur, setIsBlur] = useState<boolean>(false);

    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });

    const { colors } = useTheme();

    useImperativeHandle(ref, () => ({
      closeWindow: () => {
        translateY.value = withSpring(0, { duration, dampingRatio });
        runOnJS(onWindowStateChange)({ isOpened: false, isCurrentBlur: false });
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
      hiddenPartStyle: {
        maxHeight: height * 0.6,
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
      if (translateY.value !== 0 && hiddenPartHeight !== -height) {
        if (changedHeight > hiddenPartHeight) {
          translateY.value = translateY.value - (changedHeight - hiddenPartHeight);
        } else if (changedHeight < hiddenPartHeight) {
          translateY.value = translateY.value + (hiddenPartHeight - changedHeight);
        }
      }
      setHiddenPartHeight(changedHeight);
    };

    return (
      <>
        {isBlur && <Blur />}
        <Animated.View
          style={[styles.animatedWrapper, computedStyles.animatedWrapper, bottomWindowAnimatedStyle, style]}
          exiting={FadeOut}
          entering={FadeIn}
        >
          <BottomWindow style={styles.bottom} windowStyle={styles.window}>
            <GestureDetector gesture={gesture}>
              <View>
                <View style={styles.draggableZone}>
                  <View style={[styles.draggableElement, computedStyles.draggableElement]} />
                </View>
                <View style={[styles.visiblePart, visiblePartStyles]}>{visiblePart}</View>
              </View>
            </GestureDetector>
            <View onLayout={onHiddenPartLayout} style={styles.hiddenWrapper}>
              <Separator style={styles.separator} />
              <ScrollViewWithCustomScroll
                style={[computedStyles.hiddenPartStyle, hiddenPartStyles]}
                barStyle={styles.scrollBar}
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
            </View>
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
  },
});
