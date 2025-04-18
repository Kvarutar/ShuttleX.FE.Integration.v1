import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions, type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';
import Shade from '../../atoms/Shade';
import BottomWindow from '../BottomWindow';
import { type BottomWindowRef } from '../BottomWindow/props';
import ScrollViewWithCustomScroll from '../ScrollViewWithCustomScroll';
import { type BottomWindowWithGestureProps, type BottomWindowWithGestureRef } from './props';

const windowHeight = Dimensions.get('window').height;
const animationDuration = 200;
const maxThreshold = 20;

const BottomWindowWithGesture = forwardRef<BottomWindowWithGestureRef, BottomWindowWithGestureProps>(
  (
    {
      alerts,
      opened = false,
      setIsOpened,
      withHiddenPartScroll = true,
      withVisiblePartScroll = false,
      withAllPartsScroll = false,
      withShade = false,
      shadeStyle,
      maxHeight = 0.93,
      minHeight,
      withDraggable = true,
      onGestureStart,
      onAnimationEnd,
      onHiddenOrVisibleHeightChange,
      bottomWindowStyle,
      containerStyle,
      visiblePart,
      visiblePartStyle,
      visiblePartContainerStyle,
      visiblePartWrapperStyle,
      hiddenPart,
      hiddenPartStyle,
      hiddenPartContainerStyle,
      hiddenPartWrapperStyle,
      hiddenPartButton,
      headerElement,
      headerWrapperStyle,
      additionalTopContent,
    },
    ref,
  ) => {
    const { colors } = useTheme();

    const animatedScrollViewRef = useRef<Animated.ScrollView>(null);
    const bottomWindowRef = useRef<BottomWindowRef>(null);

    const progress = useSharedValue(opened ? 0 : 1); // 0 - opened, 1 - closed
    const threshold = useSharedValue(0);
    const isCurrentOpen = useSharedValue(opened);
    const isWindowAnimating = useSharedValue(false);

    const hiddenAnimatedHeight = useSharedValue(0);
    const visibleAnimatedHeight = useSharedValue(0);
    const headerElementAnimatedHeight = useSharedValue(0);
    const currentHiddenAnimatedHeight = useSharedValue(0);
    const contentAnimatedHeight = useSharedValue(0);

    const scrollBegin = useSharedValue(0);
    const scrollY = useSharedValue(0);
    const isContentWillScroll = useSharedValue(false);

    const onHiddenOrVisibleHeightChangeCallback = () => {
      if (onHiddenOrVisibleHeightChange && bottomWindowRef.current) {
        //Black magic, don't change timeout (for now)
        //TODO: Maybe rewrite setTimeout with cleaner idea?
        setTimeout(() => {
          bottomWindowRef.current?.measure((_, __, ___, ____, _____, pageY) => {
            onHiddenOrVisibleHeightChange({
              isOpened: isCurrentOpen.value,
              isWindowAnimating: isWindowAnimating.value,
              pageY,
            });
          });
        }, 200); // Min 150 + 50 for safety
      }
    };

    useDerivedValue(() => {
      if ((hiddenAnimatedHeight.value, visibleAnimatedHeight.value)) {
        runOnJS(onHiddenOrVisibleHeightChangeCallback)();
      }
    }, [hiddenAnimatedHeight, visibleAnimatedHeight]);

    const translateY = useDerivedValue(() => progress.value * hiddenAnimatedHeight.value + threshold.value);
    const bottomWindowAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));
    const thresholdContainerAnimatedStyle = useAnimatedStyle(() => ({
      height: threshold.value < 0 ? Math.abs(threshold.value) : 0,
    }));

    const [isShadeVisible, setIsShadeVisible] = useState<boolean>(opened);
    const [isAlertsVisible, setIsAlertsVisible] = useState(true);
    const [isScrollable, setIsScrollable] = useState(false);

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

    const onScroll = useAnimatedScrollHandler({
      onBeginDrag: event => {
        scrollBegin.value = event.contentOffset.y;
      },
      onScroll: event => {
        scrollY.value = event.contentOffset.y;
      },
    });

    const onAnimationEndCallback = useCallback(
      (isOpened: boolean) => {
        if (onAnimationEnd) {
          bottomWindowRef.current?.measure((_, __, ___, ____, _____, pageY) => {
            onAnimationEnd({ isOpened, pageY });
          });
        }
      },
      [onAnimationEnd],
    );

    const onWindowStateChange = useCallback(
      ({ isOpened, isCurrentShade }: { isOpened: boolean; isCurrentShade: boolean }) => {
        setIsShadeVisible(isCurrentShade);
        if (isOpened) {
          setIsOpened && runOnJS(setIsOpened)(isOpened);
        } else {
          setTimeout(() => {
            setIsOpened && runOnJS(setIsOpened)(isOpened);
          }, animationDuration);
        }
        isWindowAnimating.value = true;
        progress.value = withTiming(
          isOpened ? 0 : 1,
          {
            duration: animationDuration,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          },
          () => {
            isWindowAnimating.value = false;
            runOnJS(onAnimationEndCallback)(isOpened);
          },
        );
        isCurrentOpen.value = isOpened;
      },
      [setIsOpened, onAnimationEndCallback, isCurrentOpen, isWindowAnimating, progress],
    );

    const scrollToTop = () => {
      animatedScrollViewRef?.current?.scrollTo({ y: 0, animated: true });
    };

    // We can't run this function while animation occurs
    // Here fix for issue https://docs.swmansion.com/react-native-reanimated/docs/guides/worklets/
    const interpolateDown = (value: number) => {
      'worklet';
      return interpolate(value, [0, 100], [0, 1], Extrapolation.CLAMP);
    };

    // We can't run this function while animation occurs
    // Here fix for issue https://docs.swmansion.com/react-native-reanimated/docs/guides/worklets/
    const interpolateUp = (value: number) => {
      'worklet';
      return 1 - interpolate(value, [0, 100], [0, 1], Extrapolation.CLAMP);
    };

    const gesture = Gesture.Pan()
      .onStart(event => onGestureStart && runOnJS(onGestureStart)(event))
      .onUpdate(event => {
        // If animation starts from position "opened"
        if (isCurrentOpen.value) {
          const percent = (Math.abs(event.translationY) * 100) / hiddenAnimatedHeight.value;
          // If moving occurs to bottom position
          if (event.translationY > 0) {
            progress.value = interpolateDown(Math.min(percent, 100));
            // If animation to bottom position is completed
            if (progress.value === 1) {
              // In this case, when progress.value === 1, percent is always bigger than 100, that's why we calculating percent - 100 here
              threshold.value = Math.min(percent - 100, maxThreshold);
            }
          }
          // Else, if gesture started to bottom, but moved to top (for correct animation on special gestures)
          else {
            // In this case percent is calculating from 0 (positive)
            progress.value = interpolateUp(Math.max(percent, 100));
            threshold.value = Math.max(-percent, -maxThreshold);
          }
        }
        // Else, if animation starts from position "closed"
        else {
          const percent = (-event.translationY * 100) / hiddenAnimatedHeight.value;
          // // If moving occurs to top position
          if (event.translationY < 0) {
            progress.value = interpolateUp(Math.max(percent, 0));
            if (progress.value === 0) {
              // In this case, when progress.value === 0, percent is always bigger than 100, but we need negative count less than -maxThreshold that's why we calculating -percent + 100 here
              threshold.value = Math.max(-percent + 100, -maxThreshold);
            }
          }
          // Else, if gesture started to top, but moved to bottom (for correct animation on special gestures)
          else {
            progress.value = interpolateDown(Math.max(percent, 100));
            threshold.value = Math.min(Math.abs(percent), maxThreshold);
          }
        }
      })
      .onEnd(() => {
        runOnJS(scrollToTop)();
        let isStateWasChanged = false;
        // If animation ends and current state is "opened"
        if (isCurrentOpen.value) {
          // Close window
          if (progress.value > 0.1) {
            isStateWasChanged = true;
            runOnJS(onWindowStateChange)({ isOpened: false, isCurrentShade: false });
            runOnJS(setIsAlertsVisible)(true);
          }
          // Open window
          else if (progress.value < 0.1) {
            runOnJS(onWindowStateChange)({ isOpened: true, isCurrentShade: true });
          }
        }
        // If animation ends and current state is "closed"
        else {
          // Close window
          if (progress.value > 0.9) {
            runOnJS(onWindowStateChange)({ isOpened: false, isCurrentShade: false });
            runOnJS(setIsAlertsVisible)(true);
          }
          // Open window
          else if (progress.value < 0.9) {
            isStateWasChanged = true;
            runOnJS(onWindowStateChange)({ isOpened: true, isCurrentShade: true });
          }
        }
        threshold.value = withTiming(0, { duration: animationDuration }, () => {
          if (!isStateWasChanged) {
            runOnJS(onAnimationEndCallback)(isCurrentOpen.value);
          }
        });
      });

    useDerivedValue(() => {
      if (isCurrentOpen.value) {
        runOnJS(scrollToTop)();
      }
      runOnJS(setIsScrollable)(isCurrentOpen.value && withAllPartsScroll);
    }, [isCurrentOpen]);

    useEffect(() => {
      if (withAllPartsScroll) {
        scrollToTop();
      }
    }, [withAllPartsScroll]);

    // The second Gesture.Pan handler for working with BottomWindow with scroll of all parts
    // With this second handler we can close BottomWindow even if we have scroll-gestures detection
    // Fix for issue is here https://github.com/Rakha112/react-native-animation/blob/main/season1/src/16-React-Native-Bottom-Sheet-Reanimated-With-Scroll/src/components/BottomSheetScrollView.tsx
    const scrollViewGesture = Gesture.Native();

    const panScroll = Gesture.Pan()
      .onUpdate(event => {
        //TODO: Check this logic on different real devices
        // Works strange on some devices

        // If animation starts from position "opened"
        // if (isCurrentOpen.value) {
        // const percent = (Math.abs(event.translationY - scrollBegin.value) * 100) / hiddenAnimatedHeight.value;

        // // If moving occurs to bottom position and scroll is in position 0 (because it's animation for ScrollView)
        // if (event.translationY > 0 && scrollY.value === 0) {
        //   progress.value = interpolateDown(Math.min(percent, 100));

        //   // If animation to bottom position is completed
        //   if (progress.value === 1) {
        //     // In this case, when progress.value === 1, percent is always bigger than 100, that's why we calculating percent - 100 here
        //     threshold.value = Math.min(percent - 100, maxThreshold);
        //   }
        // }
        // if gesture started to bottom, but moved to top (for correct animation on special gestures) and scroll in position 0 (because it's animation for ScrollView)
        // if (event.translationY < 0 && scrollY.value === 0) {
        //   progress.value = interpolateUp(Math.max(percent, 100));
        //   threshold.value = Math.max(-percent, -maxThreshold);
        // }
        // }
        // Else, if animation starts from position "closed"
        if (!isCurrentOpen.value) {
          const percent = (-event.translationY * 100) / hiddenAnimatedHeight.value;

          // If moving occurs to top position
          if (event.translationY < 0) {
            progress.value = interpolateUp(Math.max(percent, 0));
            if (progress.value === 0) {
              // In this case, when progress.value === 0, percent is always bigger than 100, but we need negative count less than -maxThreshold that's why we calculating -percent + 100 here
              threshold.value = Math.max(-percent + 100, -maxThreshold);
            }
          }
          // Else, if gesture started to top, but moved to bottom (for correct animation on special gestures)
          else {
            progress.value = interpolateDown(Math.max(percent, 100));
            threshold.value = Math.min(Math.abs(percent), maxThreshold);
          }
        }
      })
      .onEnd(() => {
        threshold.value = withTiming(0, { duration: animationDuration });
        // If animation ends and current state is "opened"
        if (isCurrentOpen.value) {
          // Close window
          if (progress.value > 0.1) {
            runOnJS(onWindowStateChange)({ isOpened: false, isCurrentShade: false });
            runOnJS(setIsAlertsVisible)(true);
          }
          // Open window
          else if (progress.value < 0.1) {
            runOnJS(onWindowStateChange)({ isOpened: true, isCurrentShade: true });
          }
        }
        // If animation ends and current state is "closed"
        else {
          // Close window
          if (progress.value > 0.9) {
            runOnJS(onWindowStateChange)({ isOpened: false, isCurrentShade: false });
            runOnJS(setIsAlertsVisible)(true);
          }
          // Open window
          else if (progress.value < 0.9) {
            runOnJS(onWindowStateChange)({ isOpened: true, isCurrentShade: true });
          }
        }
      });

    useDerivedValue(() => {
      runOnJS(setIsScrollable)(isCurrentOpen.value && withAllPartsScroll);
    });

    const computedStyles = StyleSheet.create({
      thresholdContainer: {
        backgroundColor: colors.backgroundPrimaryColor,
      },
      bottom: {
        maxHeight: windowHeight * maxHeight,
        minHeight: hiddenPart ? 'auto' : windowHeight * maxHeight,
      },
      headerWrapper: {
        backgroundColor: colors.backgroundPrimaryColor,
        marginHorizontal: (sizes.paddingHorizontal / 4) * 3, // margin 3/4
      },
      draggableElement: {
        backgroundColor: colors.draggableColor,
      },
      visiblePart: {
        marginTop: visiblePart ? 0 : 6,
      },
      contentContainer: {
        flexShrink: isScrollable ? 0 : 1,
      },
      window: {
        paddingHorizontal: sizes.paddingHorizontal / 4, // padding 1/4
      },
      contentWrapper: {
        marginHorizontal: (sizes.paddingHorizontal / 4) * 3, // margin 3/4
      },
      scrollBar: {
        right: -sizes.paddingHorizontal / 2,
      },
    });

    const visiblePartAnimatedStyle = useAnimatedStyle(() => {
      const minHeightValue = minHeight
        ? (typeof minHeight === 'number' ? minHeight : minHeight.value) * windowHeight
        : null;

      return {
        maxHeight: !isCurrentOpen.value && minHeightValue ? minHeightValue : maxHeight * windowHeight,
        minHeight: minHeightValue ? minHeightValue : 'auto',
      };
    });

    const onContentPartLayout = (_: number, height: number) => {
      contentAnimatedHeight.value = height;
      isContentWillScroll.value = withAllPartsScroll && height > windowHeight * maxHeight;
    };

    const onHeaderElementLayout = (e: LayoutChangeEvent) => {
      headerElementAnimatedHeight.value = e.nativeEvent.layout.height;
    };

    useDerivedValue(() => {
      if (isContentWillScroll.value && withAllPartsScroll) {
        hiddenAnimatedHeight.value =
          windowHeight * maxHeight - visibleAnimatedHeight.value - headerElementAnimatedHeight.value;
      } else if (!isContentWillScroll.value && withAllPartsScroll) {
        hiddenAnimatedHeight.value = currentHiddenAnimatedHeight.value;
      }
      isContentWillScroll.value =
        withAllPartsScroll &&
        contentAnimatedHeight.value + headerElementAnimatedHeight.value > windowHeight * maxHeight;
    });

    const onHiddenPartLayout = (e: LayoutChangeEvent) => {
      currentHiddenAnimatedHeight.value = e.nativeEvent.layout.height;
      if (hiddenPart && (!withAllPartsScroll || !isContentWillScroll.value)) {
        hiddenAnimatedHeight.value = e.nativeEvent.layout.height;
      }
    };

    const onVisiblePartLayout = (e: LayoutChangeEvent) => {
      visibleAnimatedHeight.value = e.nativeEvent.layout.height;
      if ((!hiddenPart || withAllPartsScroll) && !isCurrentOpen.value) {
        hiddenAnimatedHeight.value = windowHeight * maxHeight - e.nativeEvent.layout.height;
      }
    };

    const content = (
      <View style={[styles.contentWrapper, computedStyles.contentWrapper]}>
        <Animated.View onLayout={onVisiblePartLayout} style={visiblePartAnimatedStyle}>
          <Animated.View style={[styles.visiblePart, computedStyles.visiblePart, visiblePartWrapperStyle]}>
            {withVisiblePartScroll ? (
              <ScrollViewWithCustomScroll
                withScrollToTop
                withShadow
                style={visiblePartStyle}
                barStyle={computedStyles.scrollBar}
                wrapperStyle={styles.scrollViewWrapper}
                contentContainerStyle={visiblePartContainerStyle}
              >
                {visiblePart}
              </ScrollViewWithCustomScroll>
            ) : (
              visiblePart
            )}
          </Animated.View>
        </Animated.View>
        <Animated.View onLayout={onHiddenPartLayout} style={[styles.hiddenWrapper, hiddenPartWrapperStyle]}>
          <View style={styles.hiddenScrollWrapper}>
            {withHiddenPartScroll ? (
              <ScrollViewWithCustomScroll
                withScrollToTop
                withShadow
                style={hiddenPartStyle}
                barStyle={computedStyles.scrollBar}
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
      </View>
    );

    return (
      <>
        {isShadeVisible && withShade && <Shade style={shadeStyle} />}
        <Animated.View
          style={[styles.animatedWrapper, bottomWindowAnimatedStyle, containerStyle]}
          exiting={FadeOut}
          entering={FadeIn}
        >
          <BottomWindow
            ref={bottomWindowRef}
            additionalTopContent={additionalTopContent}
            alerts={alerts}
            showAlerts={isAlertsVisible}
            style={styles.bottom}
            windowStyle={[styles.window, computedStyles.window, computedStyles.bottom, bottomWindowStyle]}
          >
            <GestureDetector gesture={gesture}>
              <View style={styles.contentAndHeaderWrapper}>
                <View
                  onLayout={onHeaderElementLayout}
                  style={[styles.headerWrapper, computedStyles.headerWrapper, headerWrapperStyle]}
                >
                  {headerElement}
                  {withDraggable && (
                    <View style={styles.draggableZone}>
                      <View style={[styles.draggableElement, computedStyles.draggableElement]} />
                    </View>
                  )}
                </View>
                {withAllPartsScroll ? (
                  <GestureDetector gesture={Gesture.Simultaneous(panScroll, scrollViewGesture)}>
                    <Animated.ScrollView
                      ref={animatedScrollViewRef}
                      bounces={false}
                      onScroll={onScroll}
                      scrollEventThrottle={16}
                      scrollEnabled={isScrollable}
                      onContentSizeChange={onContentPartLayout}
                    >
                      {content}
                    </Animated.ScrollView>
                  </GestureDetector>
                ) : (
                  content
                )}
              </View>
            </GestureDetector>
          </BottomWindow>
        </Animated.View>
        <Animated.View
          style={[styles.thresholdContainer, computedStyles.thresholdContainer, thresholdContainerAnimatedStyle]}
        />
      </>
    );
  },
);

export default BottomWindowWithGesture;

const styles = StyleSheet.create({
  thresholdContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
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
    marginTop: 6,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  hiddenScrollWrapper: {
    flex: 0,
    flexShrink: 1,
  },
  headerWrapper: {
    marginTop: 1,
    borderRadius: 2,
  },
  draggableElement: {
    width: 36,
    height: 5,
    borderRadius: 5,
  },
  window: {
    paddingVertical: 0,
  },
  contentWrapper: {
    flexShrink: 1,
  },
  contentAndHeaderWrapper: {
    flexShrink: 1,
  },
  visiblePart: {
    position: 'relative',
    paddingBottom: 8,
    zIndex: 1,
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
