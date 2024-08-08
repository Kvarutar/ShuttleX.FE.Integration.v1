import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Dimensions, type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
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
const duration = 200;

const BottomWindowWithGesture = forwardRef<BottomWindowWithGestureRef, BottomWindowWithGestureProps>(
  (
    {
      visiblePart,
      hiddenPart,
      alerts,
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

    const progress = useSharedValue(1); // 0 - opened, 1 - closed
    const isCurrentOpen = useSharedValue(false);

    const hiddenAnimatedHeight = useSharedValue(0);
    const visibleAnimatedHeight = useSharedValue(0);

    const translateY = useDerivedValue(() => progress.value * hiddenAnimatedHeight.value);
    const bottomWindowAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const [isBlur, setIsBlur] = useState<boolean>(false);
    const [isAlertsVisible, setIsAlertsVisible] = useState(true);

    const context = useSharedValue({ y: 0 });

    useImperativeHandle(ref, () => ({
      closeWindow: () => {
        runOnJS(onWindowStateChange)({ isOpened: false, isCurrentBlur: false });
        runOnJS(setIsAlertsVisible)(true);
      },
    }));

    const onWindowStateChange = useCallback(
      ({ isOpened, isCurrentBlur }: { isOpened: boolean; isCurrentBlur: boolean }) => {
        setIsBlur(isCurrentBlur);
        setIsOpened?.(isOpened);
        progress.value = withTiming(isOpened ? 0 : 1, { duration });
        isCurrentOpen.value = isOpened;
      },
      [setIsOpened, isCurrentOpen, progress],
    );

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
        runOnJS(setIsAlertsVisible)(false);
      })
      .onUpdate(event => {
        const shift = context.value.y - event.translationY;

        if (isCurrentOpen.value) {
          const percent = (Math.abs(shift) * 100) / hiddenAnimatedHeight.value;
          if (shift < 0 && percent <= 100) {
            progress.value = interpolate(percent, [0, 100], [0, 1], Extrapolation.CLAMP);
          }
        } else {
          const percent = ((shift - hiddenAnimatedHeight.value) * 100) / hiddenAnimatedHeight.value;
          if (percent > 0) {
            progress.value = 1 - interpolate(percent, [0, 100], [0, 1], Extrapolation.CLAMP);
          }
        }
      })
      .onEnd(() => {
        if (progress.value > 0.5) {
          runOnJS(onWindowStateChange)({ isOpened: false, isCurrentBlur: false });
          runOnJS(setIsAlertsVisible)(true);
        } else if (progress.value < 0.5) {
          runOnJS(onWindowStateChange)({ isOpened: true, isCurrentBlur: true });
        }
      });

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
      hiddenAnimatedHeight.value = e.nativeEvent.layout.height;
    };

    const onVisiblePartLayout = (e: LayoutChangeEvent) => {
      visibleAnimatedHeight.value = e.nativeEvent.layout.height;
    };

    return (
      <>
        {isBlur && <Blur />}
        <Animated.View
          style={[styles.animatedWrapper, bottomWindowAnimatedStyle, style]}
          exiting={FadeOut}
          entering={FadeIn}
        >
          <BottomWindow
            alerts={alerts}
            showAlerts={isAlertsVisible}
            style={styles.bottom}
            windowStyle={[styles.window, computedStyles.bottom]}
          >
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
