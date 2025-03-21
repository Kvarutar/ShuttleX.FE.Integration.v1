import MaskedView from '@react-native-masked-view/masked-view';
import { useCallback, useMemo, useState } from 'react';
import { type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../../core/themes/themeContext';
import {
  type LinkedWrapperElementLayoutType,
  type LinkedWrapperProps,
  LinkedWrapperShadows,
  type ShadowOptionsType,
} from './types';

const shadowDistance = 20;

const LinkedWrapper = ({ data, wrapperStyle, flexDirection = 'row', withShadow }: LinkedWrapperProps) => {
  const { colors } = useTheme();

  const [elementsLayout, setElementsLayout] = useState<LinkedWrapperElementLayoutType[]>([]);

  const computedStyles = StyleSheet.create({
    wrapperStyle: {
      flexDirection,
    },
  });

  const handleLayout = useCallback((event: LayoutChangeEvent, index: number) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setElementsLayout(prevState => {
      const newState = [...prevState];
      newState[index] = { x, y, width: Math.floor(width), height };
      return newState;
    });
  }, []);

  const memoizedConnectedElement = useMemo(
    () => (index: number) =>
      elementsLayout
        .map((element, i) => {
          const prev = elementsLayout[i - 1];
          if (!prev) {
            return null;
          }

          const prevRenderElement = data[index + 1];
          const currentRenderElement = data[index];

          const prevColor = prevRenderElement?.color ?? colors.borderDashColor;
          const currentColor = currentRenderElement?.color ?? colors.borderDashColor;

          const minElementHeight = Math.min(element.height, prev.height);
          const minElementWidth = Math.min(element.width, prev.width);

          let rightBottomRadius = element.width / 2,
            leftTopRadius = prev.width / 2;
          if (flexDirection === 'row') {
            rightBottomRadius = element.height / 2;
            leftTopRadius = prev.height / 2;
          }

          let rightBottomRound = 0;
          if (prevRenderElement?.shape === 'circle' || !prevRenderElement?.shape) {
            rightBottomRound = rightBottomRadius - Math.sqrt(rightBottomRadius ** 2 - (minElementHeight / 4) ** 2);
          }

          let leftTopRound = 0;
          if (currentRenderElement?.shape === 'circle' || !currentRenderElement?.shape) {
            leftTopRound = leftTopRadius - Math.sqrt(leftTopRadius ** 2 - (minElementWidth / 4) ** 2);
          }

          const elementExtraWidthWithRound = Math.ceil(rightBottomRound) + Math.ceil(leftTopRound);

          let width = minElementWidth / 2,
            height = element.y - (prev.y + prev.height) + elementExtraWidthWithRound,
            positionLeft = prev.width * 0.5 - minElementWidth / 4,
            positionTop = prev.height - Math.ceil(leftTopRound);
          if (flexDirection === 'row') {
            width = element.x - (prev.x + prev.width) + elementExtraWidthWithRound;
            height = minElementHeight / 2;
            positionLeft = prev.width - Math.ceil(leftTopRound);
            positionTop = prev.height * 0.5 - minElementHeight / 4;
          }

          let path = `
              M 0,0
              C 0,0 ${width / 2},${(9 / 4) * leftTopRound} ${width},0
              C ${width},0 ${width / 5},${height / 2} ${width},${height}
              C ${width},${height} ${width / 2},${height - (9 / 4) * rightBottomRound} 0,${height}
              C 0,${height} ${width / 1.2},${height / 2} 0,0
              Z
            `;
          if (flexDirection === 'row') {
            path = `
              M 0,0
              C 0,0 ${width / 2},${height / 1.2} ${width},0
              C ${width},0 ${width - (9 / 4) * rightBottomRound},${height / 2} ${width},${height}
              C ${width},${height} ${width / 2},${height / 5} 0,${height}
              C 0,${height} ${(9 / 4) * leftTopRound},${height / 2} 0,0
              Z
            `;
          }

          let linearGradientEnd = {
            x: 0,
            y: 1,
          };
          if (flexDirection === 'row') {
            linearGradientEnd = {
              x: 1,
              y: 0,
            };
          }

          let shadowOptions: ShadowOptionsType = {
            offset: {
              defaultShadow: [0, shadowDistance],
              connectedElement: [prev.width / 2, prev.height + shadowDistance * 2],
              lastShadow: [prev.width / 2 - element.width / 2, prev.height + height],
            },
            extraShadowStyle: {
              height: height > shadowDistance * 2 ? height - shadowDistance * 2 : 0,
              width: width / 4,
            },
          };
          if (flexDirection === 'row') {
            shadowOptions = {
              offset: {
                defaultShadow: [shadowDistance, 0],
                connectedElement: [prev.width + shadowDistance * 2, prev.height / 2],
                lastShadow: [prev.width + width, prev.height / 2 - element.height / 2],
              },
              extraShadowStyle: {
                height: height / 4,
                width: width > shadowDistance * 2 ? width - shadowDistance * 2 : 0,
              },
            };
          }

          const shadowColor =
            withShadow === LinkedWrapperShadows.Strong ? colors.strongShadowColor : colors.weakShadowColor;

          const localComputedStyles = StyleSheet.create({
            mask: {
              left: positionLeft,
              top: positionTop,
              width: width,
              height: height,
            },
            shadow: {
              borderRadius: (currentRenderElement?.shape === 'circle' ?? !currentRenderElement?.shape) ? 1000 : 16,
              height: prev.height,
            },
            lastShadow: {
              width: element.width,
              height: element.height,
            },
          });

          return (
            <>
              {withShadow && (
                <>
                  <Shadow
                    distance={shadowDistance}
                    startColor={shadowColor}
                    offset={shadowOptions.offset.defaultShadow}
                    stretch
                    containerStyle={StyleSheet.absoluteFill}
                    style={localComputedStyles.shadow}
                  />
                  <Shadow
                    distance={shadowDistance}
                    startColor={shadowColor}
                    offset={shadowOptions.offset.connectedElement}
                    containerStyle={StyleSheet.absoluteFill}
                    style={shadowOptions.extraShadowStyle}
                  />
                  {data.length - 2 === index && (
                    <Shadow
                      distance={shadowDistance}
                      startColor={shadowColor}
                      offset={shadowOptions.offset.lastShadow}
                      containerStyle={StyleSheet.absoluteFill}
                      style={[localComputedStyles.shadow, localComputedStyles.lastShadow]}
                    />
                  )}
                </>
              )}

              <MaskedView
                key={i}
                style={[styles.mask, localComputedStyles.mask]}
                maskElement={
                  <Svg width={width} height={height}>
                    <Path d={path} />
                  </Svg>
                }
              >
                <LinearGradient
                  locations={[0.3, 0.7]}
                  start={{ x: 0, y: 0 }}
                  end={linearGradientEnd}
                  colors={[currentColor, prevColor]}
                  style={styles.gradient}
                />
              </MaskedView>
            </>
          );
        })
        .filter(item => item !== null)[index],
    [colors, data, elementsLayout, flexDirection, withShadow],
  );

  return (
    <View style={[wrapperStyle, styles.wrapperStyle, computedStyles.wrapperStyle]}>
      {data.map((child, index) => (
        <View key={`wrapper_${index}`} style={child.containerStyle} onLayout={event => handleLayout(event, index)}>
          {memoizedConnectedElement(index)}
          {child.element}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    alignItems: 'center',
  },
  mask: {
    position: 'absolute',
  },
  gradient: {
    flex: 1,
  },
});

export default LinkedWrapper;
