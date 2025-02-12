import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
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

import TopViewCarImage from '../../shared/images/TopViewCarImage';
import LoadingAnimation3dots from '../../shared/molecules/LoadingAnimation3dots';
import { useTheme } from '../themes/v2/themeContext';
import { AnimatedMarker } from './hooks';
import { type MapCarProps } from './types';

const rotationAnimationDuration = 600;
const thinkingAnimationConsts = {
  shadowDistance: 20,
  paddingLeft: 45,
  paddingBottom: 70,
};

const MapCar = ({ coordinates, heading, animationDuration, withThinkingAnimation = false }: MapCarProps) => {
  const { colors } = useTheme();

  const markerRef = useRef<MapMarker>(null);
  const thinkingAnimationMarkerRef = useRef<MapMarker>(null);
  const markerCoordinates = useSharedValue<LatLng>(coordinates);

  const setCurrentCarMarkerPosition = (latlng: LatLng) => {
    markerRef.current?.setNativeProps({ coordinate: latlng });
    thinkingAnimationMarkerRef.current?.setNativeProps({ coordinate: latlng });
  };

  useDerivedValue(() => {
    runOnJS(setCurrentCarMarkerPosition)(markerCoordinates.value);
  }, [markerCoordinates]);

  useEffect(() => {
    markerCoordinates.value = withTiming(coordinates, {
      easing: Easing.linear,
      duration: animationDuration,
    });
  }, [markerCoordinates, coordinates, animationDuration]);

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

  return (
    <>
      <AnimatedMarker
        ref={markerRef}
        coordinate={coordinates}
        anchor={{ x: 0.5, y: 0.5 }} // centers icon
        flat
        tracksViewChanges
      >
        <Animated.View style={[styles.carImageContainer, carMarkerAnimatedStyle]}>
          <TopViewCarImage />
        </Animated.View>
      </AnimatedMarker>
      {withThinkingAnimation && (
        <AnimatedMarker ref={thinkingAnimationMarkerRef} coordinate={coordinates} anchor={{ x: 0.5, y: 0.5 }}>
          <View style={styles.thinkingAnimationContainer}>
            <Shadow
              distance={thinkingAnimationConsts.shadowDistance}
              startColor={colors.strongShadowColor}
              stretch
              paintInside
            >
              <LoadingAnimation3dots />
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
  thinkingAnimationContainer: {
    paddingLeft: thinkingAnimationConsts.shadowDistance + thinkingAnimationConsts.paddingLeft,
    paddingRight: thinkingAnimationConsts.shadowDistance,
    paddingTop: thinkingAnimationConsts.shadowDistance,
    paddingBottom: thinkingAnimationConsts.shadowDistance + thinkingAnimationConsts.paddingBottom,
  },
});

export default MapCar;
