import { useEffect, useRef } from 'react';
import { type ImageStyle, Platform, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { type LatLng, type MapMarker } from 'react-native-maps';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import TopViewCarImage from '../../../../shared/images/TopViewCarImage';
import LoadingAnimation3dots from '../../../../shared/molecules/LoadingAnimation3dots';
import { useTheme } from '../../../themes/themeContext';
import { AnimatedMarker } from '../../hooks';
import { type MapCarMarkerProps } from './types';

const rotationAnimationDuration = 600;
export const thinkingAnimationConsts = {
  shadowDistance: 20,
  paddingLeft: 45,
  paddingBottom: 70,
};

export const constants = {
  carImageContainer: {
    width: 100,
    height: 100,
  },
};

const MapCarMarker = ({
  coordinate,
  heading,
  animationDuration,
  zIndex,
  thinkingAnimationZIndex,
  withThinkingAnimation = false,
  carStyles,
  loadingAnimation3DotsStyles,
}: MapCarMarkerProps) => {
  const { colors } = useTheme();

  const markerRef = useRef<MapMarker>(null);
  const markerCoordinatesRef = useRef<LatLng>(coordinate);
  const thinkingAnimationMarkerRef = useRef<MapMarker>(null);
  //This state fix problem with car animation on Android, coordinates need only on first render
  const markerCoordinates = useSharedValue<LatLng>(coordinate);

  const setCurrentCarMarkerPosition = (latlng: LatLng) => {
    markerRef.current?.setNativeProps({ coordinate: latlng });
    thinkingAnimationMarkerRef.current?.setNativeProps({ coordinate: latlng });
  };

  useDerivedValue(() => {
    runOnJS(setCurrentCarMarkerPosition)(markerCoordinates.value);
  }, [markerCoordinates]);

  useEffect(() => {
    markerCoordinates.value = withTiming(coordinate, {
      easing: Easing.linear,
      duration: animationDuration,
    });
  }, [markerCoordinates, coordinate, animationDuration]);

  const carMarkerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(`${heading}deg`, {
          duration: rotationAnimationDuration,
          easing: Easing.linear,
        }),
      },
    ],
  }));

  const computedStyles = StyleSheet.create({
    carImageContainer: {
      width: carStyles?.carImageContainerWidthAndHeight ?? constants.carImageContainer.width,
      height: carStyles?.carImageContainerWidthAndHeight ?? constants.carImageContainer.width,
    },
  });

  const getLoadingAnimation3DotsStyles = () => {
    if (loadingAnimation3DotsStyles) {
      return {
        width: loadingAnimation3DotsStyles.thinkingDotWidthAndHeight,
        height: loadingAnimation3DotsStyles.thinkingDotWidthAndHeight,
      };
    }
    return undefined;
  };

  const carStylesArr: StyleProp<ImageStyle>[] = [styles.carImage];
  const thinkingAnimationContainerStylesArr: StyleProp<ViewStyle>[] = [styles.thinkingAnimationContainer];

  if (carStyles) {
    carStylesArr.push({ height: carStyles.carImageHeight });
  }

  if (loadingAnimation3DotsStyles) {
    thinkingAnimationContainerStylesArr.push(loadingAnimation3DotsStyles.thinkingDotContainer);
  }

  return (
    <>
      <AnimatedMarker
        ref={markerRef}
        // coordinate={Platform.OS === 'android' ? currentCoordinate : coordinate}
        coordinate={markerCoordinatesRef.current}
        anchor={{ x: 0.5, y: 0.5 }} // centers icon
        flat
        tracksViewChanges
        zIndex={zIndex}
      >
        <Animated.View style={[styles.carImageContainer, computedStyles.carImageContainer, carMarkerAnimatedStyle]}>
          <TopViewCarImage
            //Need for re-render this image and correct recalculating position of it on marker on android
            key={Platform.OS === 'android' ? carStyles?.carImageContainerWidthAndHeight : undefined}
            style={carStylesArr}
          />
        </Animated.View>
      </AnimatedMarker>
      {withThinkingAnimation && (
        <AnimatedMarker
          ref={thinkingAnimationMarkerRef}
          coordinate={coordinate}
          anchor={{ x: 0.5, y: 0.5 }}
          zIndex={thinkingAnimationZIndex}
        >
          <View style={thinkingAnimationContainerStylesArr}>
            <Shadow
              distance={thinkingAnimationConsts.shadowDistance}
              startColor={colors.strongShadowColor}
              stretch
              paintInside
            >
              <LoadingAnimation3dots style={getLoadingAnimation3DotsStyles()} />
            </Shadow>
          </View>
        </AnimatedMarker>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  carImageContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carImage: {
    //Because if we use the "width" style, the car image goes beyond dimensions of the marker
    aspectRatio: 0.4,
  },
  thinkingAnimationContainer: {
    paddingLeft: thinkingAnimationConsts.shadowDistance + thinkingAnimationConsts.paddingLeft,
    paddingRight: thinkingAnimationConsts.shadowDistance,
    paddingTop: thinkingAnimationConsts.shadowDistance,
    paddingBottom: thinkingAnimationConsts.shadowDistance + thinkingAnimationConsts.paddingBottom,
  },
});

export default MapCarMarker;
