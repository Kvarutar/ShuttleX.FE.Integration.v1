import React, { useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import { type FlatListWithCustomScrollProps } from './props';

const FlatListWithCustomScroll = ({
  items,
  renderItems,
  style,
  barStyle,
  withScroll = false,
  visibleBarOffset = 0,
}: FlatListWithCustomScrollProps) => {
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
    <>
      <FlatList
        data={items}
        renderItem={renderItems}
        showsVerticalScrollIndicator={false}
        style={style}
        onContentSizeChange={(_, height) => setCompleteScrollBarHeight(height)}
        onLayout={e => setVisibleScrollBarHeight(e.nativeEvent.layout.height - visibleBarOffset)}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollIndicator } } }], {
          useNativeDriver: false,
          listener: () => !isScrollBarVisible && setIsScrollBarVisible(true),
        })}
      />
      {isScrollBarVisible && <Animated.View style={[styles.scrollBar, computedStyles.scrollBar, barStyle]} />}
    </>
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
});

export default FlatListWithCustomScroll;
