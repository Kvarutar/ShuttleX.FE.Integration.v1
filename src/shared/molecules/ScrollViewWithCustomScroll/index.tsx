import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { type ScrollViewWithCustomScrollProps } from './props';

const ScrollViewWithCustomScroll = ({
  children,
  withScroll = false,
  scrollable = true,
  withScrollToTop = false,
  barStyle,
  style,
  withShadow = false,
  offsetForShadow = 10,
  contentContainerStyle,
  wrapperStyle,
  ...scrollViewRemainingProps
}: ScrollViewWithCustomScrollProps) => {
  const { colors } = useTheme();
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);

  const [isScrollBarVisible, setIsScrollBarVisible] = useState(withScroll);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const scrollViewRef = useRef<ScrollView>(null);

  // Means moving scroll to top when elements update (f.e. when BottomWindow have scroll only when it's opened. When it's closed, we have problem with elements on display, which we can't scroll on this state)
  useEffect(() => {
    if (scrollViewRef.current && withScrollToTop) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [children, withScrollToTop]);

  useEffect(() => {
    const shouldEnableScroll = completeScrollBarHeight > visibleScrollBarHeight;
    setScrollEnabled(shouldEnableScroll && scrollable);
    setIsScrollBarVisible(shouldEnableScroll && withScroll && scrollable);
  }, [completeScrollBarHeight, visibleScrollBarHeight, withScroll, scrollable]);

  let scrollIndicatorSize = visibleScrollBarHeight;
  if (completeScrollBarHeight > visibleScrollBarHeight) {
    scrollIndicatorSize = (visibleScrollBarHeight * visibleScrollBarHeight) / completeScrollBarHeight;
  }

  if (withShadow) {
    scrollIndicatorSize -= offsetForShadow * 2;
  }

  const difference = visibleScrollBarHeight > scrollIndicatorSize ? visibleScrollBarHeight - scrollIndicatorSize : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp',
  });

  const computedStyles = StyleSheet.create({
    scrollBar: {
      backgroundColor: colors.iconSecondaryColor,
      height: scrollIndicatorSize,
      transform: [{ translateY: scrollIndicatorPosition }],
    },
    scrollView: {
      marginVertical: withShadow ? -offsetForShadow : 0,
    },
    contentContainerStyle: {
      paddingVertical: withShadow ? offsetForShadow : 0,
    },
  });

  const onContentSizeChange = (height: number) => {
    setCompleteScrollBarHeight(height);
  };

  return (
    <View style={[styles.container, wrapperStyle]}>
      <ScrollView
        ref={scrollViewRef}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.contentContainerStyle,
          computedStyles.contentContainerStyle,
          contentContainerStyle,
        ]}
        style={[styles.scrollView, computedStyles.scrollView, style]}
        onContentSizeChange={(_, height) => onContentSizeChange(height)}
        onLayout={e => setVisibleScrollBarHeight(e.nativeEvent.layout.height)}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollIndicator } } }], {
          useNativeDriver: false,
          listener: () =>
            !isScrollBarVisible && visibleScrollBarHeight < completeScrollBarHeight && setIsScrollBarVisible(true),
        })}
        {...scrollViewRemainingProps}
      >
        {children}
      </ScrollView>
      {isScrollBarVisible && <Animated.View style={[styles.scrollBar, computedStyles.scrollBar, barStyle]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollBar: {
    width: 2,
    borderRadius: 8,
    position: 'absolute',
    right: -sizes.paddingVertical / 2,
    top: 0,
  },
  scrollView: {
    marginHorizontal: -sizes.paddingHorizontal,
  },
  contentContainerStyle: {
    paddingHorizontal: sizes.paddingHorizontal,
  },
});

export default ScrollViewWithCustomScroll;
