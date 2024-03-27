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
  visibleBarOffset = 10,
  contentContainerStyle,
  wrapperStyle,
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

  const onContentSizeChange = (height: number) => {
    setCompleteScrollBarHeight(height);
    if (completeScrollBarHeight >= visibleScrollBarHeight) {
      setIsScrollBarVisible(false);
    }
  };

  return (
    <View style={[styles.container, wrapperStyle]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.contentContainerStyle, contentContainerStyle]}
        style={[styles.scrollView, style]}
        onContentSizeChange={(_, height) => onContentSizeChange(height)}
        onLayout={e => setVisibleScrollBarHeight(e.nativeEvent.layout.height - visibleBarOffset)}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollIndicator } } }], {
          useNativeDriver: false,
          listener: () =>
            !isScrollBarVisible && visibleScrollBarHeight < completeScrollBarHeight && setIsScrollBarVisible(true),
        })}
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
    top: 10,
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
