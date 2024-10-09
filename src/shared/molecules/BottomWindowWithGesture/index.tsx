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
import { useTheme } from '../../../core/themes/v2/themeContext';
import Shade from '../../atoms/Shade';
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
      containerStyle,
      visiblePartStyle,
      hiddenPartStyle,
      opened = false,
      setIsOpened,
      hiddenPartContainerStyle,
      hiddenPartButton,
      bottomWindowStyle,
      withHiddenPartScroll = true,
      withShade = false,
      shadeStyle,
      hiddenPartWrapperStyle,
      maxHeight = 0.93,
      withDraggable = true,
    },
    ref,
  ) => {
    const { colors } = useTheme();

    const progress = useSharedValue(opened ? 0 : 1); // 0 - opened, 1 - closed
    const isCurrentOpen = useSharedValue(opened);

    const hiddenAnimatedHeight = useSharedValue(0);
    const visibleAnimatedHeight = useSharedValue(0);

    const translateY = useDerivedValue(() => progress.value * hiddenAnimatedHeight.value);
    const bottomWindowAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const [isShadeVisible, setIsShadeVisible] = useState<boolean>(opened);
    const [isAlertsVisible, setIsAlertsVisible] = useState(true);

    const context = useSharedValue({ y: 0 });

    useImperativeHandle(ref, () => ({
      closeWindow: () => {
        runOnJS(onWindowStateChange)({ isOpened: false, isCurrentShade: false });
        runOnJS(setIsAlertsVisible)(true);
      },
      openWindow: () => {
        runOnJS(onWindowStateChange)({ isOpened: true, isCurrentShade: true });
        runOnJS(setIsAlertsVisible)(false);
      },
    }));

    const onWindowStateChange = useCallback(
      ({ isOpened, isCurrentShade }: { isOpened: boolean; isCurrentShade: boolean }) => {
        setIsShadeVisible(isCurrentShade);
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
          runOnJS(onWindowStateChange)({ isOpened: false, isCurrentShade: false });
          runOnJS(setIsAlertsVisible)(true);
        } else if (progress.value < 0.5) {
          runOnJS(onWindowStateChange)({ isOpened: true, isCurrentShade: true });
        }
      });

    const computedStyles = StyleSheet.create({
      bottom: {
        maxHeight: height * maxHeight,
      },
      draggableElement: {
        backgroundColor: colors.draggableColor,
      },
      visiblePart: {
        marginTop: visiblePart ? 14 : 6,
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
        {isShadeVisible && withShade && <Shade style={shadeStyle} />}
        <Animated.View
          style={[styles.animatedWrapper, bottomWindowAnimatedStyle, containerStyle]}
          exiting={FadeOut}
          entering={FadeIn}
        >
          <BottomWindow
            alerts={alerts}
            showAlerts={isAlertsVisible}
            style={styles.bottom}
            windowStyle={[styles.window, computedStyles.bottom, bottomWindowStyle]}
          >
            <GestureDetector gesture={gesture}>
              <Animated.View onLayout={onVisiblePartLayout}>
                {withDraggable && (
                  <View style={styles.draggableZone}>
                    <View style={[styles.draggableElement, computedStyles.draggableElement]} />
                  </View>
                )}
                <View style={[styles.visiblePart, computedStyles.visiblePart, visiblePartStyle]}>{visiblePart}</View>
              </Animated.View>
            </GestureDetector>
            <Animated.View onLayout={onHiddenPartLayout} style={[styles.hiddenWrapper, hiddenPartWrapperStyle]}>
              <View style={styles.hiddenScrollWrapper}>
                {withHiddenPartScroll ? (
                  <ScrollViewWithCustomScroll
                    withShadow
                    style={hiddenPartStyle}
                    barStyle={styles.scrollBar}
                    wrapperStyle={styles.scrollViewWrapper}
                    contentContainerStyle={hiddenPartContainerStyle}
                  >
                    {hiddenPart}
                  </ScrollViewWithCustomScroll>
                ) : (
                  <View style={hiddenPartStyle}>{hiddenPart}</View>
                )}
              </View>
              {hiddenPartButton && <>{hiddenPartButton}</>}
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
    left: 0,
    right: 0,
    top: 6,
    alignItems: 'center',
  },
  hiddenScrollWrapper: {
    flex: 0,
    flexShrink: 1,
  },
  draggableElement: {
    width: 36,
    height: 5,
    borderRadius: 5,
  },
  window: {
    paddingVertical: 0,
  },
  visiblePart: {
    paddingBottom: 8,
  },
  scrollBar: {
    right: -sizes.paddingHorizontal / 2,
  },
  hiddenWrapper: {
    flexShrink: 1,
    paddingBottom: sizes.paddingVertical,
  },
  scrollViewWrapper: {
    flex: 0,
    flexShrink: 1,
  },
});
