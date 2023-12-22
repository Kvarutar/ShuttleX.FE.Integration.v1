import React, { useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import { type FlatListWithCustomScrollProps } from './props';

const FlatListWithCustomScroll = ({
  items,
  renderItems,
  itemHeight,
  style,
  barStyle,
}: FlatListWithCustomScrollProps) => {
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
  const [isScrollBarVisible, setIsScrollBarVisible] = useState(false);

  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    scrollBar: {
      backgroundColor: colors.iconSecondaryColor,
    },
  });

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight) / completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference = visibleScrollBarHeight > scrollIndicatorSize ? visibleScrollBarHeight - scrollIndicatorSize : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp',
  });

  return (
    <>
      <FlatList
        data={items}
        renderItem={renderItems}
        showsVerticalScrollIndicator={false}
        style={style}
        onContentSizeChange={() => setCompleteScrollBarHeight(itemHeight * items.length)}
        onLayout={e => setVisibleScrollBarHeight(e.nativeEvent.layout.height)}
        getItemLayout={(data, index) => ({ length: itemHeight, offset: itemHeight * index, index, data })}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollIndicator } } }], {
          useNativeDriver: false,
          listener: () => !isScrollBarVisible && setIsScrollBarVisible(true),
        })}
      />
      {isScrollBarVisible && (
        <Animated.View
          style={[
            styles.scrollBar,
            computedStyles.scrollBar,
            {
              height: scrollIndicatorSize,
              transform: [{ translateY: scrollIndicatorPosition }],
            },
            barStyle,
          ]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollBar: {
    width: 2,
    borderRadius: 8,
    position: 'absolute',
    right: 10,
    top: 25,
  },
});

export default FlatListWithCustomScroll;
