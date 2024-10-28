import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Dimensions, type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
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

const windowHeight = Dimensions.get('window').height;
const animationDuration = 200;

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
      withVisiblePartScroll = false,
      withAllPartsScroll = false,
      withShade = false,
      shadeStyle,
      hiddenPartWrapperStyle,
      maxHeight = 0.93,
      minHeight,
      withDraggable = true,
      headerElement,
    },
    ref,
  ) => {
    const { colors } = useTheme();

    const progress = useSharedValue(opened ? 0 : 1); // 0 - opened, 1 - closed
    const isCurrentOpen = useSharedValue(opened);

    const hiddenAnimatedHeight = useSharedValue(0);
    const visibleAnimatedHeight = useSharedValue(0);
    const currentHiddenAnimatedHeight = useSharedValue(0);

    const isContentWillScroll = useSharedValue(false);

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
        if (isOpened) {
          setIsOpened?.(isOpened);
        } else {
          setTimeout(() => {
            setIsOpened?.(isOpened);
          }, animationDuration);
        }
        progress.value = withTiming(isOpened ? 0 : 1, {
          duration: animationDuration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
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

    const [isScrollable, setIsScrollable] = useState(false);

    useDerivedValue(() => {
      runOnJS(setIsScrollable)(isCurrentOpen.value && withAllPartsScroll);
    });

    const computedStyles = StyleSheet.create({
      bottom: {
        maxHeight: windowHeight * maxHeight,
        minHeight: hiddenPart ? 'auto' : windowHeight * maxHeight,
      },
      headerWrapper: {
        backgroundColor: colors.backgroundPrimaryColor,
      },
      draggableElement: {
        backgroundColor: colors.draggableColor,
      },
      visiblePart: {
        marginTop: visiblePart ? 14 : 6,
      },
      scrollAllPartsContaierStyle: {
        flexShrink: isScrollable ? 0 : 1,
      },
    });

    const visiblePartAnimatedStyle = useAnimatedStyle(() => ({
      maxHeight: !isCurrentOpen.value && minHeight ? minHeight * windowHeight : maxHeight * windowHeight,
    }));

    const onContentPartLayout = (e: LayoutChangeEvent) => {
      isContentWillScroll.value = withAllPartsScroll && e.nativeEvent.layout.height > windowHeight * maxHeight;
    };

    useDerivedValue(() => {
      if (isContentWillScroll.value && withAllPartsScroll) {
        hiddenAnimatedHeight.value = windowHeight * maxHeight - visibleAnimatedHeight.value;
      } else if (!isContentWillScroll.value && withAllPartsScroll) {
        hiddenAnimatedHeight.value = currentHiddenAnimatedHeight.value;
      }
    }, [isContentWillScroll]);

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
      <View onLayout={onContentPartLayout} style={styles.contentWrapper}>
        <Animated.View onLayout={onVisiblePartLayout} style={visiblePartAnimatedStyle}>
          <Animated.View style={[styles.visiblePart, computedStyles.visiblePart, visiblePartStyle]}>
            {withVisiblePartScroll ? (
              <ScrollViewWithCustomScroll
                withScrollToTop
                withShadow
                style={hiddenPartStyle}
                barStyle={styles.scrollBar}
                wrapperStyle={styles.scrollViewWrapper}
                contentContainerStyle={hiddenPartContainerStyle}
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
            alerts={alerts}
            showAlerts={isAlertsVisible}
            style={styles.bottom}
            windowStyle={[styles.window, computedStyles.bottom, bottomWindowStyle]}
          >
            <GestureDetector gesture={gesture}>
              <View style={[styles.headerWrapper, computedStyles.headerWrapper]}>
                {headerElement}
                {withDraggable && (
                  <View style={styles.draggableZone}>
                    <View style={[styles.draggableElement, computedStyles.draggableElement]} />
                  </View>
                )}
              </View>
            </GestureDetector>
            {withAllPartsScroll ? (
              <ScrollViewWithCustomScroll
                scrollable={isScrollable}
                withScrollToTop
                barStyle={styles.scrollBar}
                wrapperStyle={styles.scrollViewWrapper}
                contentContainerStyle={computedStyles.scrollAllPartsContaierStyle}
              >
                {content}
              </ScrollViewWithCustomScroll>
            ) : (
              content
            )}
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
  headerWrapper: {
    position: 'absolute',
    right: 0,
    left: 0,
    height: 30,
    zIndex: 2,
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
    paddingTop: 10, // for headerElement's correct spacing
  },
  contentWrapper: {
    flexShrink: 1,
  },
  visiblePart: {
    position: 'relative',
    paddingBottom: 8,
    zIndex: 1,
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
