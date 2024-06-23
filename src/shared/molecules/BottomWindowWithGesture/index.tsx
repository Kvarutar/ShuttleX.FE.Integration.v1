import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Dimensions, type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
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
    const { colors } = useTheme();

    const [hiddenPartHeight, setHiddenPartHeight] = useState<number>(0);
    const [visiblePartHeight, setVisiblePartHeight] = useState<number>(0);

    const [isBlur, setIsBlur] = useState<boolean>(false);

    const translateY = useSharedValue(-height);
    const context = useSharedValue({ y: 0 });

    useEffect(() => {
      if (translateY.value === -height && hiddenPartHeight !== 0) {
        translateY.value = -hiddenPartHeight;
      }
    }, [hiddenPartHeight, translateY]);

    useImperativeHandle(ref, () => ({
      closeWindow: () => {
        runOnJS(onWindowStateChange)({ isOpened: false, isCurrentBlur: false });
      },
    }));

    const onWindowStateChange = useCallback(
      ({ isOpened, isCurrentBlur }: { isOpened: boolean; isCurrentBlur: boolean }) => {
        setIsBlur(isCurrentBlur);
        setIsOpened?.(isOpened);
      },
      [setIsOpened],
    );

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate(event => {
        const shift = context.value.y - event.translationY;
        if (shift > 0) {
          translateY.value = 0;
        } else {
          translateY.value = Math.max(shift, -hiddenPartHeight);
        }
      })
      .onEnd(() => {
        if (translateY.value < -hiddenPartHeight / 2) {
          translateY.value = withSpring(-hiddenPartHeight, { duration, dampingRatio });
          runOnJS(onWindowStateChange)({ isOpened: false, isCurrentBlur: false });
        } else if (translateY.value > -hiddenPartHeight / 1.5) {
          translateY.value = withSpring(0, { duration, dampingRatio });
          runOnJS(onWindowStateChange)({ isOpened: true, isCurrentBlur: true });
        }
      });

    const bottomWindowAnimatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: -translateY.value }] }));

    const computedStyles = StyleSheet.create({
      bottom: {
        maxHeight: height * 0.8,
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
      if (newHeight < visiblePartHeight && visiblePartHeight !== 0) {
        translateY.value = withTiming(-hiddenPartHeight - (visiblePartHeight - newHeight), { duration });
      } else if (newHeight > visiblePartHeight && visiblePartHeight !== 0 && !isBlur) {
        translateY.value = withTiming(-hiddenPartHeight + (newHeight - visiblePartHeight), { duration });
      }
      setVisiblePartHeight(e.nativeEvent.layout.height);
    };

    return (
      <>
        {isBlur && <Blur />}
        <Animated.View
          style={[styles.animatedWrapper, bottomWindowAnimatedStyle, style]}
          exiting={FadeOut}
          entering={FadeIn}
        >
          <BottomWindow style={styles.bottom} windowStyle={[styles.window, computedStyles.bottom]}>
            <GestureDetector gesture={gesture}>
              <Animated.View onLayout={onVisiblePartLayout}>
                <View style={styles.draggableZone}>
                  <View style={[styles.draggableElement, computedStyles.draggableElement]} />
                </View>
                <View style={[styles.visiblePart, visiblePartStyles]}>{visiblePart}</View>
              </Animated.View>
            </GestureDetector>
            <Animated.View onLayout={onHiddenPartLayout} style={styles.hiddenWrapper}>
              <Separator style={styles.separator} />
              <View style={styles.hiddenScrollWrapper}>
                <ScrollViewWithCustomScroll
                  withShadow
                  style={hiddenPartStyles}
                  barStyle={styles.scrollBar}
                  wrapperStyle={styles.scrollViewWrapper}
                  contentContainerStyle={hiddenPartContainerStyles}
                >
                  {hiddenPart}
                </ScrollViewWithCustomScroll>
              </View>
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
    bottom: 0,
  },
  draggableZone: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 10,
    alignItems: 'center',
  },
  hiddenScrollWrapper: {
    flex: 0,
    flexShrink: 1,
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
    right: -sizes.paddingHorizontal / 2,
  },
  separator: {
    marginBottom: 30,
    flex: 0,
  },
  buttonSeparator: {
    marginVertical: 20,
    flex: 0,
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
