import React, { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';
import { type ScrollViewWithCustomScrollProps } from './props';

const ScrollViewWithCustomScroll = ({
  children,
  withScroll = false,
  barStyle,
  style,
  visibleBarOffset = 0,
}: ScrollViewWithCustomScrollProps) => {
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);

  const [isScrollBarVisible, setIsScrollBarVisible] = useState(withScroll);

  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const { colors } = useTheme();

  let scrollIndicatorSize = visibleScrollBarHeight;
  if (completeScrollBarHeight > visibleScrollBarHeight) {
    scrollIndicatorSize = (visibleScrollBarHeight * visibleScrollBarHeight) / completeScrollBarHeight;
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
  });

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
        style={[styles.scrollView, style]}
        onContentSizeChange={(_, height) => setCompleteScrollBarHeight(height)}
        onLayout={e => setVisibleScrollBarHeight(e.nativeEvent.layout.height - visibleBarOffset)}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollIndicator } } }], {
          useNativeDriver: false,
          listener: () => !isScrollBarVisible && setIsScrollBarVisible(true),
        })}
      >
        {children}
      </ScrollView>
      {isScrollBarVisible && <Animated.View style={[styles.scrollBar, computedStyles.scrollBar, barStyle]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollBar: {
    width: 2,
    borderRadius: 8,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  scrollView: {
    marginHorizontal: -sizes.paddingHorizontal,
    marginVertical: -10,
  },
  contentContainerStyle: {
    paddingHorizontal: sizes.paddingHorizontal,
    paddingVertical: 10,
  },
});

export default ScrollViewWithCustomScroll;
